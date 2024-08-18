// package kipid.test;

// import kipid.test.SignalProto.Wifi;
// import java.time.Instant;
// import java.time.ZoneId;
// import java.time.ZonedDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.function.Function;
// import java.util.stream.Collectors;
// import javax.annotation.Nullable;
// import org.apache.commons.lang3.tuple.ImmutablePair;
// import org.apache.commons.lang3.tuple.Pair;

// public class WifiUtil {
// 	/**
// 	 * Use this to get a {@link String} of wifi informations in human-readable form.
// 	 * Scanned-wifi-infos are truncated with {@code VALID_RSSI_LOWER_BOUND} (exclusive)
// 	 * and sorted by the strongest signal strength (rssi).
// 	 */
// 	public static String toDebugMessage(@Nullable Wifi wifi) {
// 		if (wifi==null) {
// 			return "Wifi 신호가 없습니다.";
// 		}

// 		final int VALID_RSSI_LOWER_BOUND=-80;
// 		Wifi.Info currentWifi=wifi.getConnectedInfo();
// 		List<Wifi.Info> scannedWifi=wifi.getScannedInfosList().stream()
// 				.filter(info -> info.getRssi()>VALID_RSSI_LOWER_BOUND)
// 				.sorted((w1, w2) -> w2.getRssi()-w1.getRssi())
// 				.collect(Collectors.toList());

// 		return new StringBuilder()
// 				.append("[Wifi 상태]\n"
// 						+DEBUG_TIME_FORMATTER.format(ZonedDateTime.ofInstant(
// 								Instant.ofEpochMilli(wifi.getTimestamp()), ZONE_ID_SEOUL))
// 						+"-"+wifi.getState().name()+"\n")
// 				.append("[연결된 Wifi]\n"+(wifi.hasConnectedInfo()?toString(currentWifi):"없음."))
// 				.append("[Scan 결과]\n"+scannedWifi.stream()
// 						.map(WifiUtil::toString)
// 						.reduce(String::concat)
// 						.orElse("없음."))
// 				.toString();
// 	}

// 	private static String toString(Wifi.Info info) {
// 		return String.format("SSID: %s, 세기: %d, BSSID: %s\n",
// 				info.getSsid(), info.getRssi(), info.getBssid());
// 	}

// 	// Default parameters used to guess the distance from wifi.
// 	private static final double RSSI_AT_1M=-40.0;
// 	private static final double DECAY_EXP=25.0;

// 	/**
// 	 * Guesses the distance from wifi, by wifi info (rssi), in meters.
// 	 * When the signal is too weak (rssi less than -109, or null {@link Wifi.Info}) to determine the
// 	 * distance, this returns max distance, 200 m, where wifi signal can reach.
// 	 * On the other hand, when the signal is stronger than {@code RSSI_AT_1M}, this returns min
// 	 * distance, 1 m, since the accuracy within 1 meter is not our concern.
// 	 *
// 	 * @param info {@link Wifi.Info} including rssi (Received Signal Strength Indication).
// 	 * @return The guessed distance from the specified wifi, in meters.
// 	 */
// 	static double guessDistanceFromWifi(@Nullable Wifi.Info info) {
// 		if (info==null) {
// 			return 200.0;  // Max distance where wifi signal can reach.
// 		}

// 		int rssi=info.getRssi();

// 		if (rssi>=RSSI_AT_1M) {
// 			return 1.0;  // Min distance since the accuracy within 1 meter is not our concern.
// 		}

// 		if (rssi<-90) {
// 			return 200.0;  // Max distance since the signal is too weak to get the accurate distance.
// 		}

// 		return guessDistanceFromWifi(rssi, RSSI_AT_1M, DECAY_EXP);
// 	}

// 	/**
// 	 * Helper function (private) to guess ths distance from wifi, through rssi.
// 	 * See
// 	 * https://stackoverflow.com/questions/20416218/understanding-ibeacon-distancing/20434019#20434019
// 	 * https://forums.estimote.com/t/use-rssi-measure-the-distance/3665
// 	 * Recommended keyword for deeper investigation is "rssi to distance".
// 	 *
// 	 * @param rssi Received Signal Strength Indication in dBm.
// 	 * @param txPower RSSI at 1 meter, in dBm.
// 	 * @param decayExp Decay exponent, usually from 20 to 25.
// 	 * @return The distance from wifi, in meters.
// 	 */
// 	private static double guessDistanceFromWifi(final double rssi, final double txPower, final double decayExp) {
// 		return Math.pow(10.0, (txPower-rssi)/decayExp);
// 	}

// 	/**
// 	 * <p>Guesses the distance between two scanned-wifi-informations, in meters.
// 	 * If the guessed distance is over 140 m, it means that the distance is
// 	 * over 140 m, not the guessed distance. In that case, use another measure to guess
// 	 * the distance between two.
// 	 *
// 	 * <p>우리가 알 수 있는 정보는 어딘가에 고정된 wifi (k) 로부터 대략 어느정도 떨어져 있었느냐 (d_k) 이기 때문에,
// 	 * 이 거리가 어떻게 변하였는지를 보고 이동거리를 추측할 수 밖에 없다. 이 경우 두개의 원 (반지름 d1_k, d2_k) 이 그려지고
// 	 * 이동거리 (d21) 는 {@code |d2_k-d1_k| < d21 < d2_k+d1_k} 일 수밖에 없는데, 여러 고정점에서부터의 거리정보가
// 	 * 있을 경우 and 조건이기 때문에 이 범위가 줄어들 수 있다.
// 	 * 즉, {@code max_k |d2_k-d1_k| < d21 < min_k' (d2_k'+d1_k')} 란 조건이 나온다.
// 	 *
// 	 * <p>단, wifi rssi 로부터 추측한 wifi 로부터의 거리값이 장애물 유무나 wifi 특성 (rssi at 1m), temporal dead
// 	 * 등에 따라 오차가 클 수 있기 때문에, 위의 and 조건이 안 찾아지는 경우 (d21 의 range min 값이 max 값보다 큰 경우) 가
// 	 * 있을 수 있다. 이 경우 range min 값에 오차가 있을 확률이 매우 크기 때문에 range min 값을 무시하도록 디자인 하였다.
// 	 *
// 	 * <p>또한 d21 의 경우 range 의 max 값 근처일 경우보다 min 값 근처일 경우가 많다고 경험적으로 여겨지므로,
// 	 * min 추측값에 더 큰 비중 (0.8) 을 두고 평균을 낸 값을 리턴하도록 디자인 하였다.
// 	 *
// 	 * @return The guessed distance between two scanned-wifi-informations, in meters.
// 	 */
// 	public static double guessDistanceBtw(Wifi wifi1, Wifi wifi2) {
// 		Map<String, Wifi.Info> scannedWifi1=collectWifiInfosToMap(wifi1.getScannedInfosList());
// 		Map<String, Wifi.Info> scannedWifi2=collectWifiInfosToMap(wifi2.getScannedInfosList());

// 		Map<String, Pair<Wifi.Info, Wifi.Info>> pairsOfWifiInfo=new HashMap<>();

// 		for (String bssid1:scannedWifi1.keySet()) {
// 			// Common wifi infos. And wifi1's exclusive infos.
// 			pairsOfWifiInfo.put(bssid1, ImmutablePair.of(
// 					scannedWifi1.get(bssid1), scannedWifi2.get(bssid1)
// 			));
// 		}

// 		for (String bssid2:scannedWifi2.keySet()) {
// 			if (!scannedWifi1.containsKey(bssid2)) {
// 				// wifi2's exclusive infos.
// 				Wifi.Info info2=scannedWifi2.get(bssid2);
// 				pairsOfWifiInfo.put(bssid2, ImmutablePair.of(null, info2));
// 			}
// 		}

// 		double maxD2D1Diff=0.0;
// 		double minD2D1Add=1000.0;
// 		for (Pair<Wifi.Info, Wifi.Info> pairOfWifiInfo:pairsOfWifiInfo.values()) {
// 			double d1=guessDistanceFromWifi(pairOfWifiInfo.getLeft());
// 			double d2=guessDistanceFromWifi(pairOfWifiInfo.getRight());
// 			maxD2D1Diff=Math.max(Math.abs(d2-d1), maxD2D1Diff);
// 			minD2D1Add=Math.min(d2+d1, minD2D1Add);
// 		}

// 		if (maxD2D1Diff >= minD2D1Add) {
// 			return minD2D1Add;
// 		}
// 		return 0.8 * maxD2D1Diff+0.2 * minD2D1Add;
// 	}

// 	/**
// 	 * Calculates similarity between two scanned-wifi-informations.
// 	 * The value of similarity is from 0.0 (least similar) to 1.0 (most similar).
// 	 * When both have no scanned-wifi-informations, this returns -1.
// 	 *
// 	 * @return The similarity between two scanned-wifi-informations. [0.0 ~ 1.0]
// 	 */
// 	public static double similarityBtw(Wifi wifi1, Wifi wifi2) {
// 		Map<String, Wifi.Info> scannedWifi1=collectWifiInfosToMap(wifi1.getScannedInfosList());
// 		Map<String, Wifi.Info> scannedWifi2=collectWifiInfosToMap(wifi2.getScannedInfosList());

// 		double similaritySum=0.0;
// 		int count=0;

// 		for (String bssid1:scannedWifi1.keySet()) {
// 			// Common wifi infos. And wifi1's exclusive infos.
// 			if (scannedWifi2.containsKey(bssid1)) {
// 				int rssiDiff=scannedWifi2.get(bssid1).getRssi()-scannedWifi1.get(bssid1).getRssi();
// 				similaritySum+=1.0/(rssiDiff*rssiDiff/2500.0+1.0);
// 			}
// 			count++;
// 		}

// 		for (String bssid2:scannedWifi2.keySet()) {
// 			if (!scannedWifi1.containsKey(bssid2)) {
// 				// wifi2's exclusive infos.
// 				count++;
// 			}
// 		}

// 		return (count==0)?-1.0:similaritySum/count;
// 	}

// 	private static Map<String, Wifi.Info> collectWifiInfosToMap(List<Wifi.Info> scannedInfos) {
// 		return scannedInfos.stream()
// 				.collect(Collectors.toMap(Wifi.Info::getBssid, Function.identity()));
// 	}
// }
