import React, { useContext, useState } from "react";

import {
 IonToolbar,
 IonButtons,
 IonButton,
 IonLabel,
 IonItem,
 IonBadge,
 IonActionSheet,
 IonSearchbar,
 IonSegment,
 IonSegmentButton,
 IonItemDivider,
} from "@ionic/react";
import { Colour, FontType } from "../global";
import {
 PlayCircleOutline,
 RepeatOneSharp,
 PauseCircleOutline,
 Person,
 FastForwardSharp,
 FastRewindSharp,
 ViewAgendaSharp,
 ViewHeadlineSharp,
 MenuBookSharp,
 ArrowBackSharp,
 MoreVert,
 MenuSharp,
 FilterList,
 QueueMusicSharp,
 LibraryMusicSharp,
 CollectionsBookmarkSharp,
 ImportContacts,
} from "@material-ui/icons";
import { Menu, Badge, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import ScrollToTop from "../scroll";
function Readme() {
 const [clr, setClr] = useContext(Colour);
 let color;
 if (clr) color = "white";
 else color = "black";
 let color2;
 if (clr) color2 = "#121212";
 else color2 = "";
 let color3;
 if (clr) color3 = "#FFEB3B";
 else color3 = "#00CBFE";
 let color4;
 if (clr) color4 = "black";
 else color4 = "white";
 const [font, setFont] = useContext(FontType);

 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";
 const [anchorEl, setAnchorEl] = useState(null);
 const [anchorE2, setAnchorE2] = useState(null);
 const [showActionSheet, setShowActionSheet] = useState(false);
 function changeView() {
  setVtb(!vtb);
 }
 const [vtb, setVtb] = useState(true);
 const [wwm, setWwm] = useState(false);
 const [ppb, setPpb] = useState(false);
 const [repeat, setRepeat] = useState("true");
 let history = useHistory();
 const useStyles = makeStyles({
  slider: {
   margin: "10px 10px 5px 10px",
   padding: "0 0 0 0",
   width: "95%",
   display: "block",
  },
 });

 const classes = useStyles();
 return (
  <div style={{ padding: "10px", color: `${color}`, backgroundColor: `${color2}` }}>
   <ScrollToTop />
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start" onClick={() => history.goBack()}>
     <IonButton>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonLabel style={{ fontFamily: `${fon}` }}>Read Me</IonLabel>
   </IonToolbar>
   <div style={{ height: "60px" }}></div>
   <IonItemDivider style={{ backgroundColor: `${color3}`, color: `${color4}` }}>When you open a song you can see these below two bars</IonItemDivider>

   <br />

   <IonToolbar color={clr ? "warning" : "primary"}>
    <IonButtons slot="start">
     <Badge badgeContent={1} color="primary">
      <IonButton>
       <ArrowBackSharp />
      </IonButton>
     </Badge>
    </IonButtons>
    <IonButtons slot="start">
     <IonLabel style={{ fontFamily: `${fon}` }}>Amara Jivana</IonLabel>
    </IonButtons>
    {!wwm ? (
     <IonButtons slot="end">
      <Badge badgeContent={2} color="primary">
       <IonButton onClick={changeView}>{vtb ? <ViewAgendaSharp /> : <ViewHeadlineSharp />}</IonButton>
      </Badge>
     </IonButtons>
    ) : null}

    <IonButtons slot="end">
     <Badge badgeContent={3} color="primary">
      <IonButton
       onclick={() => {
        setWwm(!wwm);
       }}
      >
       {wwm ? <ImportContacts /> : <MenuBookSharp />}
      </IonButton>
     </Badge>
    </IonButtons>

    <IonButtons slot="end" style={{ marginRight: "10px" }}>
     <Badge badgeContent={4} color="primary">
      <IonButton aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
       <MoreVert />
      </IonButton>
     </Badge>
    </IonButtons>
   </IonToolbar>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>1</IonBadge> you can go back to the songs list{" "}
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>2</IonBadge> you can change the View of the song i.e. you can set the View as Translation after each verse or
    Translation after each song
   </p>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>3</IonBadge> you can get Translations with Word to Word Meaning!!!
   </p>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>4</IonBadge> you can{" "}
   </p>
   <p style={{ fontFamily: `${fon}` }}>i) Download the Song by current singer devotee</p>
   <p style={{ fontFamily: `${fon}` }}>ii) Add to Playlist the Song by current singer devotee</p>
   <p style={{ fontFamily: `${fon}` }}>iii) Bookmark the entire song</p>

   <IonToolbar color={clr} className="foot3">
    <Slider className={classes.slider} value={0} onChange={() => {}} aria-labelledby="continuous-slider" min={0} max={0} />
    <IonLabel style={{ fontFamily: `${fon}` }} style={{ display: "block", fontSize: "15px", textAlign: "center", margin: 0, border: 0, padding: 0 }}>
     Srila Prabhupada
    </IonLabel>
    <div style={{ display: "flex", justifyContent: "center" }}>
     <IonLabel style={{ fontFamily: `${fon}` }} className="label">
      {" "}
      0:00{" "}
     </IonLabel>

     <Badge badgeContent={5} color="primary">
      <IonButton color={clr ? "warning" : "primary"} onClick={() => setShowActionSheet(true)}>
       <Person style={{ fontSize: 18 }} />
      </IonButton>
     </Badge>

     <Badge badgeContent={6} color="primary">
      <IonButton color={clr ? "warning" : "primary"}>
       <FastRewindSharp style={{ fontSize: 18 }} />
      </IonButton>
     </Badge>
     <Badge badgeContent={7} color="primary">
      <IonButton color={clr ? "warning" : "primary"} onClick={() => setPpb(!ppb)}>
       {ppb ? <PauseCircleOutline style={{ fontSize: 18 }} /> : <PlayCircleOutline style={{ fontSize: 18 }} />}
      </IonButton>
     </Badge>
     <Badge badgeContent={8} color="primary">
      <IonButton color={clr ? "warning" : "primary"}>
       <FastForwardSharp style={{ fontSize: 18 }} />
      </IonButton>
     </Badge>

     <Badge badgeContent={9} color="primary">
      {!repeat ? (
       <IonButton color="secondary" onClick={() => setRepeat(!repeat)}>
        {" "}
        <RepeatOneSharp style={{ fontSize: 18 }} />{" "}
       </IonButton>
      ) : (
       <IonButton color={clr ? "warning" : "primary"} onClick={() => setRepeat(!repeat)}>
        {" "}
        <RepeatOneSharp style={{ fontSize: 18 }} />{" "}
       </IonButton>
      )}
     </Badge>

     <IonLabel style={{ fontFamily: `${fon}` }} className="label">
      {" "}
      10:54
     </IonLabel>
    </div>
   </IonToolbar>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>5</IonBadge> you can select the audios of different Vaishnavas for this song!!! and your choice will be
    rememberd for the next time also
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>6</IonBadge> you can rewind the song by 15 seconds
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>7</IonBadge> you can play or pause the song
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>8</IonBadge> you can forward the song by 15 seconds
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>9</IonBadge> you can repeat or unrepeat the song{" "}
   </p>

   <IonItemDivider style={{ backgroundColor: `${color3}`, color: `${color4}` }}>When you are in home page you can see the below two bars</IonItemDivider>
   <br />
   <IonToolbar color={clr ? "warning" : "primary"}>
    <IonButtons slot="start">
     <Badge badgeContent={10} color="primary">
      <MenuSharp style={{ fontSize: 30 }} />
     </Badge>
    </IonButtons>

    <Badge style={{ marginTop: "10px" }} badgeContent={11} color="primary">
     <IonSearchbar color={clr} value="search" onIonChange={() => {}} onIonClear={() => {}} showCancelButton="never" animated="true"></IonSearchbar>
    </Badge>

    <IonButtons style={{ marginRight: "15px" }} slot="end">
     <Badge badgeContent={12} color="primary">
      <IonButton aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorE2(e.currentTarget)}>
       <FilterList />
      </IonButton>
     </Badge>
    </IonButtons>
   </IonToolbar>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>10</IonBadge> you can open the Menu bar which has
   </p>
   <p style={{ fontFamily: `${fon}` }}> i) Srimad Bhagavatam Prayers (almost all Prayers from Srimad Bhagavatam)</p>
   <p style={{ fontFamily: `${fon}` }}>
    {" "}
    ii) Bhaktivedanta Music & Purports (Audios of all the Vaishnav Songs and their Purports sung by Srila Prabhupada along with their transcripts!!!)
   </p>
   <p style={{ fontFamily: `${fon}` }}>iii) Settings (you can change the font size of the songs, theme of the app, default View of songs, font type of App)</p>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>11</IonBadge> you can search Vaishnava Songs based on their starting words or official name
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>12</IonBadge> you can filter or sort the songs according to
   </p>
   <p style={{ fontFamily: `${fon}` }}>i) Alphabetical (default sorting)</p>
   <p style={{ fontFamily: `${fon}` }}>ii) Authors</p>
   <p style={{ fontFamily: `${fon}` }}>iii) Temple Songs</p>
   <p style={{ fontFamily: `${fon}` }}>iv) Pranama Mantras</p>
   <p style={{ fontFamily: `${fon}` }}>v) Astakams and Stotras</p>

   <IonToolbar color={clr ? "warning" : "primary"}>
    <IonSegment value="default">
     <IonSegmentButton value="default">
      <Badge badgeContent={13} color="primary">
       <QueueMusicSharp />
      </Badge>
     </IonSegmentButton>

     <IonSegmentButton>
      <Badge badgeContent={14} color="primary">
       <MenuBookSharp />
      </Badge>
     </IonSegmentButton>
     <IonSegmentButton>
      <Badge badgeContent={15} color="primary">
       <LibraryMusicSharp />
      </Badge>
     </IonSegmentButton>
     <IonSegmentButton>
      <Badge badgeContent={16} color="primary">
       <CollectionsBookmarkSharp />
      </Badge>
     </IonSegmentButton>
    </IonSegment>
   </IonToolbar>

   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>13</IonBadge> you can go to more than 200 Vaishnava Songs all of which have audios!!! and it is the default
    homepage
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>14</IonBadge> you can read the Song books written by our Acharyas which has more than 1000 songs!!!
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>15</IonBadge> you can go to the playslist which you have created by using Playlist option in
    <IonBadge color={clr ? "warning" : ""}>4</IonBadge>{" "}
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    Using <IonBadge color={clr ? "warning" : ""}>16</IonBadge> you can go the Bookmarks which you have created by using Bookmark option in{" "}
    <IonBadge color={clr ? "warning" : ""}>4</IonBadge>{" "}
   </p>

   <IonItemDivider style={{ backgroundColor: `${color3}`, color: `${color4}` }}>
    Note on <IonBadge color={clr ? "warning" : ""}>4</IonBadge>{" "}
   </IonItemDivider>

   <p style={{ fontFamily: `${fon}` }}>You can find the downloaded songs in the Vaishnava Songs folder in your internal or phone storage</p>
   <p style={{ fontFamily: `${fon}` }}>
    To save the usage of internet, for offline listening and also to avoid traffic in ISKCON Desire Tree, devotees are requested to download or add to playlist
    the songs which they listen often because once you download a song or add it to playlist then from next time it will be played offline from your device (but
    some devices may stop background running of the App after some time of inactivity so the Song might be stoped if you downloaded it and then playing it while
    the App is running in the background but if you play without downloading it then this problem might not come. So due to this issue if you want to play a
    song online eventhough you downloaded it then just move or delete the downloaded song from Vaishnava Songs folder in your phone storage)
   </p>

   <IonItemDivider style={{ backgroundColor: `${color3}`, color: `${color4}` }}>General Note</IonItemDivider>
   <p style={{ fontFamily: `${fon}` }}>
    When you go to a Song in Bhaktivedanta Music & Purports you will not be able to see the Audio of Prabhupada if you are offline. So to get Audio along with
    Transcripts please make sure that you are online
   </p>
   <p style={{ fontFamily: `${fon}` }}>
    There are many other feauters in Song Books section, Playlists section, Bookmarks section, Bhagavatam prayers section etc. but we are not explaing them
    here, so devotees are requested to please explore them.
   </p>
   <p style={{ fontFamily: `${fon}` }}>Hare Krishna!!!</p>
   <p style={{ fontFamily: `${fon}` }}>Your Servant</p>

   <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
    <IonItem button onClick={() => setAnchorEl(null)}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Download current song</IonLabel>
    </IonItem>
    <IonItem
     button
     onClick={() => {
      setAnchorEl(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Add to Playlist</IonLabel>
    </IonItem>
    <IonItem
     lines="none"
     button
     onClick={() => {
      setAnchorEl(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Bookmark this Song</IonLabel>
    </IonItem>
   </Menu>
   <Menu id="simple-menu" anchorEl={anchorE2} keepMounted open={Boolean(anchorE2)} onClose={() => setAnchorE2(null)}>
    <IonItem
     button
     onClick={() => {
      setAnchorE2(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Alphabetical </IonLabel>
    </IonItem>
    <IonItem
     button
     onClick={() => {
      setAnchorE2(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Authors </IonLabel>
    </IonItem>

    <IonItem
     button
     onClick={() => {
      setAnchorE2(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}>Temple Songs</IonLabel>
    </IonItem>
    <IonItem button onClick={() => setAnchorE2(null)}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Pranama Mantras </IonLabel>
    </IonItem>
    <IonItem
     lines="none"
     button
     onClick={() => {
      setAnchorE2(null);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Astakams</IonLabel>
    </IonItem>
   </Menu>
   <IonActionSheet
    isOpen={showActionSheet}
    onDidDismiss={() => setShowActionSheet(false)}
    cssClass="my-custom-class"
    buttons={[
     "Srila Prabhupada",
     "HG Swarupa Damodar Prabhu",
     "HG Jai Sachinanadana Prabhu",
     "HG Sivarama Prabhu",
     "HH Bhakti Caru Swami",
     "HH Radhanath Swami",
     "HH Suhotra Swami",
    ]}
   ></IonActionSheet>
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

export default Readme;
