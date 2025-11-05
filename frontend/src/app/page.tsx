'use client'

import React from "react";

import { useEffect } from "react";
import { initOneSignal } from "@/lib/oneSignalClient";

const Home = () => {
  useEffect(() => {
    initOneSignal();
  }, []);

  return <div>Home</div>;
};

export default Home;
