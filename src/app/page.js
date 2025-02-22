"use client";

import React from "react";
import Header from "@/components/Header";
import Form from "@/components/Form";
import Body from "@/components/Body";
import { Provider } from "react-redux";
import store from "@/core/store/configureStore"

export default function Home() {


  return (
    <Provider store={store}>
      <div className="h-full">
        <div className="h-full flex flex-col">
          {/* header */}
          <Header />

          {/* Body */}
          <Body />

          {/* form */}
          <Form />
        </div>
      </div>
    </Provider>
  );
}
