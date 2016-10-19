package net.gnehzr.tnoodle.utils;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import net.gnehzr.tnoodle.svglite.Color;

public final class GwtSafeUtils {
    private GwtSafeUtils() {}

    private static final HashMap<String, Color> WCA_COLORS = new HashMap<String, Color>();
    static {
        Color timPurple = new Color(98, 50, 122);
        Color orangeHeraldicTincture = new Color(255, 128, 0);
        WCA_COLORS.put("y", Color.YELLOW);
        WCA_COLORS.put("yellow", Color.YELLOW);
        WCA_COLORS.put("b", Color.BLUE);
        WCA_COLORS.put("blue", Color.BLUE);
        WCA_COLORS.put("r", Color.RED);
        WCA_COLORS.put("red", Color.RED);
        WCA_COLORS.put("w", Color.WHITE);
        WCA_COLORS.put("white", Color.WHITE);
        WCA_COLORS.put("g", Color.GREEN);
        WCA_COLORS.put("green", Color.GREEN);
        WCA_COLORS.put("o", orangeHeraldicTincture);
        WCA_COLORS.put("orange", orangeHeraldicTincture);
        WCA_COLORS.put("p", timPurple);
        WCA_COLORS.put("purple", timPurple);
        WCA_COLORS.put("0", Color.GRAY);
        WCA_COLORS.put("grey", Color.GRAY);
        WCA_COLORS.put("gray", Color.GRAY);
    }
    public static Color toColor(String s) {
        if(WCA_COLORS.containsKey(s)) {
            return WCA_COLORS.get(s);
        }
        try {
            return new Color(s);
        } catch(Exception e) {
            return null;
        }
    }

    private static void azzertEquals(Object a, Object b, boolean assertEquals) {
        boolean equal;
        if(a == null) {
            equal = a == b;
        } else {
            equal = a.equals(b);
        }
        String msg = assertEquals ? " should be equal to " :
                                    " should not be equal to ";
        azzert(equal == assertEquals, a + msg + b);
    }
    public static void azzertNotEquals(Object a, Object b) {
        azzertEquals(a, b, false);
    }
    public static void azzertEquals(Object a, Object b) {
        azzertEquals(a, b, true);
    }
    public static void azzertSame(Object a, Object b) {
        azzert(a == b, a + " is not == to " + b);
    }

    public static void azzert(boolean expr) {
        if(!expr) {
            throw new AssertionError();
        }
    }

    public static void azzert(boolean expr, String message) {
        if(!expr) {
            throw new AssertionError(message);
        }
    }

    public static void azzert(boolean expr, Throwable t) {
        if(!expr) {
            throw new AssertionError(t);
        }
    }

    public static int ceil(double d) {
        return (int) Math.ceil(d);
    }

    public static String join(Object[] arr, String separator) {
        if(separator == null) {
            separator = ",";
        }
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < arr.length; i++) {
            if(i > 0) {
                sb.append(separator);
            }
            sb.append(arr[i].toString());
        }
        return sb.toString();
    }

    public static <H> String join(ArrayList<H> arr, String separator) {
        if(separator == null) {
            separator = ",";
        }
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < arr.size(); i++) {
            if(i > 0) {
                sb.append(separator);
            }
            sb.append(arr.get(i).toString());
        }
        return sb.toString();
    }

    public static <H> H choose(Random r, Iterable<H> keySet) {
        H chosen = null;
        int count = 0;
        for(H element : keySet) {
            if(r.nextInt(++count) == 0) {
                chosen = element;
            }
        }
        azzert(count > 0);
        return chosen;
    }

    public static String[] parseExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        String name, extension;
        if(lastDot == -1) {
            name = filename;
            extension = null;
        } else {
            name = filename.substring(0, lastDot);
            extension = filename.substring(lastDot+1).toLowerCase();
        }
        return new String[] { name, extension };
    }

    public static Integer toInt(String string, Integer def) {
        try {
            return Integer.parseInt(string);
        } catch(Exception e) {
            return def;
        }
    }

    public static Long toLong(String string, Long def) {
        try {
            return Long.parseLong(string);
        } catch(Exception e) {
            return def;
        }
    }

    /*
     * This is here because gwt doesn't implement clone() or
     * Arrays.copyOf()
     */
    public static int[] clone(int[] src) {
        int[] dest = new int[src.length];
        System.arraycopy(src, 0, dest, 0, src.length);
        return dest;
    }

    public static double[] clone(double[] src) {
        double[] dest = new double[src.length];
        System.arraycopy(src, 0, dest, 0, src.length);
        return dest;
    }

    public static void deepCopy(int[][] src, int[][] dest) {
        for(int i = 0; i < src.length; i++) {
            System.arraycopy(src[i], 0, dest[i], 0, src[i].length);
        }
    }

    public static void deepCopy(int[][][] src, int[][][] dest) {
        for(int i = 0; i < src.length; i++) {
            deepCopy(src[i], dest[i]);
        }
    }

    public static <T> void deepCopy(T[][] src, T[][] dest) {
        for(int i = 0; i < src.length; i++) {
            System.arraycopy(src[i], 0, dest[i], 0, src[i].length);
        }
    }

    public static int indexOf(Object o, Object[] arr) {
        for(int i = 0; i < arr.length; i++) {
            if(arr[i].equals(o)) {
                return i;
            }
        }
        return -1;
    }

    public static final int modulo(int x, int m) {
        azzert(m > 0, "m must be > 0");
        int y = x % m;
        if(y < 0) {
            y += m;
        }
        return y;
    }
    
    public static int[] copyOfRange(int[] src, int from, int to) {
        int[] dest = new int[to - from];
        System.arraycopy(src, from, dest, 0, dest.length);
        return dest;
    }

    public static void fullyReadInputStream(InputStream is, ByteArrayOutputStream bytes) throws IOException {
        final byte[] buffer = new byte[0x10000];
        try {
            for(;;) {
                int read = is.read(buffer);
                if(read < 0) {
                    break;
                }
                bytes.write(buffer, 0, read);
            }
        } finally {
            is.close();
        }
    }

    public static <A, B> HashMap<B, A> reverseHashMap(HashMap<A, B> map) {
        HashMap<B, A> reverseMap = new HashMap<B, A>();
        for(A a : map.keySet()) {
            B b = map.get(a);
            reverseMap.put(b, a);
        }
        return reverseMap;
    }
    
}
