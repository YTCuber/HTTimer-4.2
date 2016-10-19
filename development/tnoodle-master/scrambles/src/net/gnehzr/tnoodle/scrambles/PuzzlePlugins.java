package net.gnehzr.tnoodle.scrambles;

import java.io.IOException;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.TreeMap;

import net.gnehzr.tnoodle.utils.BadLazyClassDescriptionException;
import net.gnehzr.tnoodle.utils.LazyInstantiator;
import net.gnehzr.tnoodle.utils.Plugins;
import net.gnehzr.tnoodle.utils.Strings;
import java.util.SortedMap;

public class PuzzlePlugins {
    private static final Logger l = Logger.getLogger(PuzzlePlugins.class.getName());
    public static final String PUZZLE_PACKAGE = "puzzle";

    private static Plugins<Puzzle> plugins = null;
    static {
        try {
            plugins = new Plugins<Puzzle>(PUZZLE_PACKAGE, Puzzle.class, Puzzle.class.getClassLoader());
        } catch (IOException e) {
            l.log(Level.SEVERE, "", e);
        } catch (BadLazyClassDescriptionException e) {
            l.log(Level.SEVERE, "", e);
        }
    }

    private static SortedMap<String, LazyInstantiator<Puzzle>> scramblers;
    public static synchronized SortedMap<String, LazyInstantiator<Puzzle>> getScramblers() throws BadLazyClassDescriptionException, IOException {
        if(scramblers == null) {
            // Sorting in a way that will take into account numbers (so 10x10x10 appears after 3x3x3)
            SortedMap<String, LazyInstantiator<Puzzle>> newScramblers =
                new TreeMap<String, LazyInstantiator<Puzzle>>(Strings.getNaturalComparator());
            newScramblers.putAll(plugins.getPlugins());
            scramblers = newScramblers;
        }
        return Collections.unmodifiableSortedMap(scramblers);
    }

    public static String getScramblerLongName(String shortName) {
        return plugins.getPluginComment(shortName);
    }

}
