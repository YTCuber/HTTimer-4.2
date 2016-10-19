package net.gnehzr.tnoodle.utils;

/*
 * This is in its own class so we can override it in gwt
 */
public class EnvGetter {
    private EnvGetter() {}

    public static final String getenv(String key) {
        return System.getenv(key);
    }
}
