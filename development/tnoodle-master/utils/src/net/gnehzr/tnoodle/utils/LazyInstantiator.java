package net.gnehzr.tnoodle.utils;

import static net.gnehzr.tnoodle.utils.GwtSafeUtils.azzert;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LazyInstantiator<H> {
    // package.FileHandler("www/")
    private static final Pattern INSTANTIATION_PATTERN = Pattern.compile("(\\S+)\\s*\\((.*)\\)");
    // TODO - this pattern doesn't actually match all valid strings
    private static final Pattern ARGUMENT_PATTERN = Pattern.compile("((\"[^,]*\")|(true)|(false)|(-?\\d+)),?\\s*");

    private String className;
    private String definition;
    private Class<H> parentClass;
    private ClassLoader classLoader;
    public LazyInstantiator(String definition, Class<H> classy, ClassLoader classLoader) throws BadLazyClassDescriptionException {
        if(classLoader == null) {
            classLoader = getClass().getClassLoader();
        }
        this.classLoader = classLoader;
        Matcher m = INSTANTIATION_PATTERN.matcher(definition);
        if(!m.matches()) {
            throw new BadLazyClassDescriptionException(definition);
        }

        this.definition = definition;
        this.parentClass = classy;

        ArrayList<Class<?>> argTypes = new ArrayList<Class<?>>();
        ArrayList<Object> args = new ArrayList<Object>();
        // group 0 is the whole string
        // group 1 is the name of the class we're lazily instantiating
        // group 2 is the constructor arguments
        this.className = m.group(1);
        String arguments = m.group(2);
        m = ARGUMENT_PATTERN.matcher(arguments);
        int start = 0;
        while(m.find(start)) {
            start = m.end();
            String strExpr = m.group(2);
            String trueExpr = m.group(3);
            String falseExpr = m.group(4);
            String intExpr = m.group(5);
            if(strExpr != null) {
                argTypes.add(String.class);
                azzert(strExpr.startsWith("\"") && strExpr.endsWith("\""));
                // TODO - handle escape character (decode string!)
                String str = strExpr.substring(1, strExpr.length()-1);
                args.add(str);
            } else if(trueExpr != null) {
                argTypes.add(boolean.class);
                args.add(true);
            } else if(falseExpr != null) {
                argTypes.add(boolean.class);
                args.add(false);
            } else if(intExpr != null) {
                argTypes.add(int.class);
                args.add(Integer.parseInt(intExpr));
            } else {
                azzert(false);
            }
        }
        if(start != arguments.length()) {
            throw new BadLazyClassDescriptionException(definition);
        }
        this.argTypes = argTypes.toArray(new Class<?>[0]);
        this.args = args.toArray();
    }

    private Constructor<? extends H> constructor;
    private Class<?>[] argTypes;
    private Object[] args;
    private Class<? extends H> thisClass;
    public H newInstance() throws LazyInstantiatorException {
        try {
            if(constructor == null) {
                thisClass = classLoader.loadClass(className).asSubclass(this.parentClass);
                constructor = thisClass.getConstructor(this.argTypes);
            }
            return constructor.newInstance(args);
        } catch(ClassNotFoundException e) {
            throw new LazyInstantiatorException(e);
        } catch(NoSuchMethodException e) {
            throw new LazyInstantiatorException(e);
        } catch(InstantiationException e) {
            throw new LazyInstantiatorException(e);
        } catch(IllegalArgumentException e) {
            throw new LazyInstantiatorException(e);
        } catch(IllegalAccessException e) {
            throw new LazyInstantiatorException(e);
        } catch(InvocationTargetException e) {
            throw new LazyInstantiatorException(e);
        }
    }

    private H cachedInstance = null;
    public synchronized H cachedInstance() throws LazyInstantiatorException {
        if(cachedInstance == null) {
            cachedInstance = newInstance();
        }
        return cachedInstance;
    }

    @Override
    public String toString() {
        return super.toString() + " " + this.definition;
    }
}
