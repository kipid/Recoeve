// Old version of updateNeighbors

// TABLE `Neighbors` 에서 `user_i`, `user_j` 형태로 되어 있었음. similarity of user_j from user_i 형태.
	
	public void putNeighbors(long user_i, StrArray sa, String now) {
		String uri=sa.get(1, "uri");
		Categories cats=new Categories(sa.get(1, "cats"));
		double val=val(sa.get(1, "val"));
		try {
			pstmtGetWholeRecos.setLong(1, user_i);
			ResultSet wholeRecos=pstmtGetWholeRecos.executeQuery();
			while (wholeRecos.next()) {
				if (wholeRecos.getString("val").isEmpty()) {
					wholeRecos.deleteRow(); // Not from DB, delete only from ResultSet.
				}
			}
			wholeRecos.beforeFirst();
			while (wholeRecos.next()) {
				if (!cats.isInTheSameTree(wholeRecos.getString("cats"))) {
					wholeRecos.deleteRow(); // Not from DB, delete only from ResultSet.
				}
			}
			
			pstmtGetRecentRecos.setString(1, uri);
			ResultSet recentRecos=pstmtGetRecentRecos.executeQuery();
			while (recentRecos.next()&&!(recentRecos.getString("val").isEmpty())) {
				double val2=val(recentRecos.getString("val"));
				if (Math.abs(val-val2)<0.5) { // Recent recoers on this URI are candidates for neighbor of user_i. Filtering too different recoers from user_i.
					long user2=recentRecos.getLong("user_i");
					Categories cats2=new Categories(recentRecos.getString("cats"));
					if (isNewNeighborAtLeast(user_i, cats.setOfSuperCatsUnderDepth(Similarity.MAX_DEPTH), user2, cats2.setOfSuperCatsUnderDepth(Similarity.MAX_DEPTH))) { // If the recoer is new neighbor of user_i, put them in after calculating similarity. Otherwise, i.e. if the recoer is already a neighbor of user_i, updateNeighbors() did the job.
						Similarity sim=new Similarity(user_i, cats, user2);
						Categories cats1=cats;
						double val1=val;
						sim.add(cats1, cats2, val1-val2);
						wholeRecos.beforeFirst(); // Whole (filtered) recos of user_i before putting the current reco.
						while (wholeRecos.next()) {
							ResultSet reco2=getReco(user2, wholeRecos.getString("uri"));
							if (reco2.next()&&!(reco2.getString("val").isEmpty())) {
								cats1=new Categories(wholeRecos.getString("cats"));
								cats2=new Categories(reco2.getString("cats"));
								val1=val(wholeRecos.getString("val"));
								val2=val(reco2.getString("val"));
								sim.add(cats1, cats2, val1-val2);
							}
						}
						putSim(sim, now);
					}
				}
			}
		} catch (SQLException e) {
			err(e);
		}
	}
	public void putSim(Similarity sim, String now) {
		try {
			// pstmtPutNeighbor=con.prepareStatement("INSERT INTO `Neighbors` (`user_i`, `cat_i`, `user_j`, `cat_j`, `sumSim`, `nSim`, `simAvg100`, `tUpdate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
			pstmtPutNeighbor.setLong(1, sim.user_i);
			pstmtPutNeighbor.setLong(3, sim.user_j);
			pstmtPutNeighbor.setString(8, now);
			for (Map.Entry<String, Map<String, Sim>> entry1: sim.map.entrySet()) {
				pstmtPutNeighbor.setString(2, entry1.getKey());
				for (Map.Entry<String, Sim> entry2: entry1.getValue().entrySet()) {
					pstmtPutNeighbor.setString(4, entry2.getKey());
					ResultSet neighbor=getNeighbor(sim.user_i, entry1.getKey(), sim.user_j, entry2.getKey());
					if (neighbor.next()) {
						// // If it already exists, check the value to be the same.
						// if (neighbor.getLong("sumSim")==entry2.getValue().sumSim
						// 	&&neighbor.getInt("nSim")==entry2.getValue().nSim
						// 	&&neighbor.getInt("simAvg100")==entry2.getValue().simAvg100()) {
						// 	// The same.
						// } else {
						// 	// Not the same.
						// }
					} else {
						pstmtPutNeighbor.setLong(5, entry2.getValue().sumSim);
						pstmtPutNeighbor.setInt(6, entry2.getValue().nSim);
						pstmtPutNeighbor.setInt(7, entry2.getValue().simAvg100());
						pstmtPutNeighbor.executeUpdate();
					}
					// // Check follower?
					// ResultSet follower=getNeighbor(sim.user_j, entry2.getKey(), sim.user_i, entry1.getKey());
					// if (follower.next()) {
					// 	if (follower.getLong("sumSim")==entry2.getValue().sumSim
					// 		&&follower.getInt("nSim")==entry2.getValue().nSim
					// 		&&follower.getInt("simAvg100")==entry2.getValue().simAvg100()) {
					// 		// The same.
					// 	} else {
					// 		// Not the same.
					// 	}
					// }
				}
			}
		} catch (SQLException e) {
			err(e);
		}
	}