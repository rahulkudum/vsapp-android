import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { IonLabel, IonToolbar, IonButton, IonButtons, IonItem, IonNote, IonCard, IonCardContent, IonSegmentButton, IonSegment } from "@ionic/react";
import { ArrowBackSharp, QueueMusicSharp, MenuBookSharp, LibraryMusicSharp, CollectionsBookmarkSharp } from "@material-ui/icons";
import { useHistory } from "react-router";
import { Colour, FontType } from "../global";

export default function About() {
 let history = useHistory();
 const [clr, setClr] = useContext(Colour);
 let color = "";
 if (clr) color = "white";
 let color2;
 if (clr) color2 = "";
 else color2 = "#04010f";
 let color3;
 if (clr) color3 = "yellow";
 let color4;
 if (clr) color4 = "#121212";
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";
 const useStyles = makeStyles({
  root: {
   flexGrow: 1,
   maxWidth: 400,
   color: `${color}`,
  },
 });
 const classes = useStyles();

 return (
  <div style={{ padding: "10px", backgroundColor: `${color4}` }}>
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start" onClick={() => history.goBack()}>
     <IonButton>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonLabel style={{ fontFamily: `${fon}` }}>About</IonLabel>
   </IonToolbar>
   <div style={{ height: "56px" }}></div>

   <IonCard color={clr} style={{ color: `${color2}` }}>
    <IonCardContent>
     <p style={{ fontFamily: `${fon}`, fontSize: "16px" }}>
      This sound is above the material platform. It is directly from the spiritual platform. And there is no need of understanding the language. It is just like
      a thunderburst. Everyone can hear the sound of thunder-there is no misunderstanding. Similarly, these songs are above the material platform, and{" "}
      <b>they crack like thunder within your heart</b>
     </p>
     <IonItem color={clr} lines="none">
      <IonNote style={{ fontFamily: `${fon}` }} slot="end">
       <h2 style={{ color: `${color}` }}> - Srila Prabhupada</h2>
      </IonNote>
     </IonItem>
    </IonCardContent>
   </IonCard>
   <p style={{ color: `${color}`, fontFamily: `${fon}` }}>
    This App (update) is offered at the Lotus feet of Srila Prabhupada on the Most Auspicious Day of his Disappearance (18th Nov 2020)
   </p>
   <p style={{ color: `${color}`, fontFamily: `${fon}` }}>
    If you want to contribute a new song or audio for exsisting song or give some suggestions on how to improve this app or want to point out any bugs in this
    app and for any type of queries and feedback please write to us
   </p>
   <p style={{ textAlign: "center", fontFamily: `${fon}` }}>
    <a style={{ color: `${color3}` }} href="mailto:vaishnavasongs108@gmail.com">
     vaishnavasongs108@gmail.com
    </a>
   </p>

   <TreeView className={classes.root} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
    <TreeItem nodeId="1" label="Acknowledgements">
     <p style={{ color: `${color}`, fontFamily: `${fon}` }}>
      Firstly I express my gratitude and humble obeisances to HG Amala Mahaprabhu Prabhu and ARJUNA group without whose compassion I would have never become a
      devotee and also to devotees of KGP VOICE whose association currently I'm missing badly and also to all the devotees who always tried to inspire me in the
      path of Krishna Consciousness
     </p>
     <p style={{ fontFamily: `${fon}` }}>
      This app wouldn't be possible without ISKCON Desire Tree ({" "}
      <a style={{ color: `${color3}` }} href="https://donate.iskcondesiretree.com">
       Donate to ISKCON Desire Tree
      </a>{" "}
      ) as all the audios and most of the song books are taken from there and I would also like to show my gratitude to the devotees who painstakingly complied
      and translated our Acaryas works(whoose details we will be providing in future updates) and also I would like to express my gratitude to all the devotees
      who gave me feedback on how to improve this app{" "}
     </p>
     <p style={{ fontFamily: `${fon}` }}>
      Finally I would like to express my gratitude to my sister who voluntarily took pain for putting the audio links and arranging the content so that my code
      can recognize them and also I would like to show gratitude to my parents who are kind enough to leave me free to do whatever I want to do and also support
      me in practing my Krishna consciousness and I would request all the devotess to please bless them so that they advance very quickly in Krishna
      Consciousness
     </p>
    </TreeItem>

    <TreeItem nodeId="2" label="Request">
     <div>
      <p style={{ fontFamily: `${fon}` }} align="center">
       grantha-dwārā baiṣṇaba-janera kṛpā pāi
      </p>

      <p style={{ fontFamily: `${fon}` }} align="center">
       baiṣṇaba-kṛpāya kṛṣṇa-lābha hoya bhāi
      </p>

      <p style={{ fontFamily: `${fon}` }}>
       If all the devotees thus appreciate this book (app), then I will receive the causeless mercy that they will shower upon me. Oh brothers! And by the mercy
       of all these Vaisnavas, I will attain devotion to the Supreme Lord Sri Kṛṣṇa.
      </p>

      <p style={{ fontFamily: `${fon}` }} align="right">
       - Kalyanakalpataru
      </p>
      <p style={{ fontFamily: `${fon}` }}>
       Hare Krishna Devotees, If you like this app then please share this app with other devotees and also please please bless me and pray for me and nowadays
       my bhakti become completely weak and I know for sure that by your kind blessings and prayers I can again practice bhakti nicely and can advance in
       Krishna Conciousness
      </p>
     </div>
    </TreeItem>
   </TreeView>
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
