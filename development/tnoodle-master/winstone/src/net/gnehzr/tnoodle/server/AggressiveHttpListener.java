package net.gnehzr.tnoodle.server;

import winstone.HostGroup;
import winstone.HttpListener;
import winstone.ObjectPool;

import java.io.IOException;
import java.net.ServerSocket;
import java.util.Map;

public class AggressiveHttpListener extends HttpListener {
    public static ServerSocket ss;

    public AggressiveHttpListener(Map<?, ?> args, ObjectPool objectPool, HostGroup hostGroup) throws IOException {
        super(args, objectPool, hostGroup);
    }

    public static int getBacklogCount() {
        return HttpListener.BACKLOG_COUNT;
    }

    @Override
    protected ServerSocket getServerSocket() throws IOException {
        return ss;
    }
}
