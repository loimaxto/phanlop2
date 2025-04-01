import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"

export default function Layout() {
    return (
        <>
        <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
            <Header />
            <Outlet />
        </>
    )
}