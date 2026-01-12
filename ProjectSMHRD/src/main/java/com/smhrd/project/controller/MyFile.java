package com.smhrd.project.controller;

import java.io.File;

public class MyFile extends File {

    public MyFile(String pathname) {
        super(pathname);
    }

    public String getPath() {
        return super.getPath();
    }
}