import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Csub from "./comp/homepage/hsonglist";
import Book from "./comp/book/books";
import Playlistv from "./comp/playlist/playlists";
import Bookmark from "./comp/bookmark/bookmarks";

import "@ionic/react/css/core.css";
import { IonProgressBar, IonCard, IonCardContent, IonNote, IonItem } from "@ionic/react";
import "./styles.css";
import { Colour, Prog } from "./comp/global";
import logo from "./splash.jpg";
import { Plugins, Capacitor } from "@capacitor/core";
const { SplashScreen } = Plugins;

function App() {
 let history = useHistory();

 useEffect(() => {
  SplashScreen.hide();
 }, []);

 useEffect(() => {
  if (Capacitor.isNative) {
   Plugins.App.addListener("backButton", (e) => {
    if (window.location.pathname === "/iskcon") {
     Plugins.App.exitApp();
    } else {
     history.goBack();
    }
   });
  }
 }, []);

 let prog = useContext(Prog);
 const [clr, setClr] = useContext(Colour);
 let color = "";
 if (clr) color = "#121212";

 if (prog.length < 16) {
  return (
   <div style={{ padding: "10px", fontFamily: "cursive", backgroundColor: "#00CBFE", height: "100vh" }}>
    <img src={logo} style={{ width: "100%" }} alt="Gauranga if Radha & Krishna combined" />

    <IonCard style={{ fontSize: "100px" }}>
     <IonCardContent>
      <IonProgressBar color="primary" value={prog.length / 20}></IonProgressBar>
      <p style={{ color: "black", fontSize: "15px", fontFamily: "cursive" }}>Fetching the Vaisnava Songs and Books...</p>
      <p style={{ color: "black", fontSize: "15px" }}>Please wait and once it is done please checkout the Read Me section in the Side Menu Bar </p>
     </IonCardContent>
    </IonCard>

    <IonCard>
     <IonCardContent>
      <p style={{ fontFamily: "Arial", fontSize: "15px", color: "black" }}>
       This sound is above the material platform. It is directly from the spiritual platform. And there is no need of understanding the language. It is just
       like a thunderburst. Everyone can hear the sound of thunder-there is no misunderstanding. Similarly, these songs are above the material platform, and
       <b> they crack like thunder within your heart</b>
      </p>
      <IonItem lines="none">
       <IonNote slot="end">
        <h2> - Srila Prabhupada</h2>
       </IonNote>
      </IonItem>
     </IonCardContent>
    </IonCard>
   </div>
  );
 } else {
  return (
   <div style={{ backgroundColor: `${color}`, height: "100vh" }}>
    <Switch>
     <Route exact path="/">
      <Redirect to="/iskcon" />
     </Route>
     <Route path="/iskcon">
      <Csub className="nav" />
     </Route>

     <Route path="/topics">
      <Book />
     </Route>

     <Route path="/playlist">
      <Playlistv />
     </Route>
     <Route path="/bookmarks">
      <Bookmark />
     </Route>
    </Switch>
   </div>
  );
 }
}

export default App;
