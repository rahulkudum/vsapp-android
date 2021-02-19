import React, { useContext } from "react";
import Slider from "@material-ui/core/Slider";
import { Colour, FontType, Tsize, View } from "../global";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { IonLabel, IonToolbar, IonButton, IonButtons, IonItem, IonRadioGroup, IonRadio, IonItemDivider, IonSegment, IonSegmentButton } from "@ionic/react";
import { ArrowBackSharp, QueueMusicSharp, MenuBookSharp, LibraryMusicSharp, CollectionsBookmarkSharp } from "@material-ui/icons";
function Settings() {
 const useStyles = makeStyles({
  slider: {
   margin: "10px 10px 10px 10px",

   width: "95%",
  },
 });
 const classes = useStyles();
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 const [tsize, setTize] = useContext(Tsize);
 let history = useHistory();

 const handleSliderChange = (event, newValue) => {
  setTize(newValue);
 };
 const [view, setView] = useContext(View);
 const [clr, setClr] = useContext(Colour);

 let color2;
 if (clr) color2 = "#FFEB3B";
 else color2 = "#00CBFE";
 let color3;
 if (clr) color3 = "black";
 else color3 = "white";

 return (
  <div>
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start" onClick={() => history.goBack()}>
     <IonButton>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonLabel style={{ fontFamily: `${fon}` }}>Settings</IonLabel>
   </IonToolbar>
   <div style={{ height: "60px" }}></div>
   <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
    <IonLabel style={{ fontFamily: `${fon}` }}>Font Size of the Songs</IonLabel>
   </IonItemDivider>

   <Slider className={classes.slider} value={tsize} onChange={handleSliderChange} aria-labelledby="continuous-slider" min={8} max={32} valueLabelDisplay="on" />

   <br />

   <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
    <IonLabel style={{ fontFamily: `${fon}` }}>Default View for the Songs</IonLabel>
   </IonItemDivider>
   <IonRadioGroup value={view} onIonChange={(e) => setView(e.detail.value)}>
    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Translation after Each Verse</IonLabel>
     <IonRadio slot="end" value="1" />
    </IonItem>

    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Translation after Song</IonLabel>
     <IonRadio slot="end" value="2" />
    </IonItem>

    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Word to Word Meanings</IonLabel>
     <IonRadio slot="end" value="3" />
    </IonItem>
   </IonRadioGroup>

   <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
    <IonLabel style={{ fontFamily: `${fon}` }}>Font Type of the App</IonLabel>
   </IonItemDivider>

   <IonRadioGroup value={font} onIonChange={(e) => setFont(e.detail.value)}>
    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>General Font</IonLabel>
     <IonRadio slot="end" value="" />
    </IonItem>

    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Vedabase Font</IonLabel>
     <IonRadio slot="end" value="ved" />
    </IonItem>
   </IonRadioGroup>

   <IonItemDivider style={{ backgroundColor: `${color2}`, color: `${color3}` }}>
    <IonLabel style={{ fontFamily: `${fon}` }}>Default Theme of the App </IonLabel>
   </IonItemDivider>
   <IonRadioGroup value={clr} onIonChange={(e) => setClr(e.detail.value)}>
    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Balarama</IonLabel>
     <IonRadio slot="end" value="" />
    </IonItem>

    <IonItem color={clr}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Krishna</IonLabel>
     <IonRadio slot="end" value="dark" />
    </IonItem>
   </IonRadioGroup>
   <IonToolbar className="tab" color={clr ? "warning" : "primary"}>
    <IonSegment>
     <IonSegmentButton onClick={() => history.push("/iskcon")}>
      <QueueMusicSharp />
     </IonSegmentButton>
     <IonSegmentButton onClick={() => history.push("/topics")}>
      <MenuBookSharp />
     </IonSegmentButton>
     <IonSegmentButton onClick={() => history.push("/playlist")}>
      <LibraryMusicSharp />
     </IonSegmentButton>
     <IonSegmentButton onClick={() => history.push("/bookmarks")}>
      <CollectionsBookmarkSharp />
     </IonSegmentButton>
    </IonSegment>
   </IonToolbar>
  </div>
 );
}

export default Settings;
