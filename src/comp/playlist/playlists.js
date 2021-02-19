import React, { useContext, useEffect, useState } from "react";
import { Playlist, Mediap, Medias, Mediasn, Mediat, Colour, FontType } from "../global";
import { useLocal } from "../lshooks";

import { IonItem, IonButton, IonLabel, IonToolbar, IonButtons, IonToast, IonCheckbox, IonAlert, IonSegment, IonSegmentButton } from "@ionic/react";

import {
 PlayCircleOutline,
 PauseCircleOutline,
 IndeterminateCheckBoxOutlined,
 AddBoxSharp,
 RepeatOneSharp,
 Repeat,
 Shuffle,
 ArrowBackIos,
 ArrowForwardIos,
} from "@material-ui/icons";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import Psub from "./psub";
import { FilePath } from "@ionic-native/file-path";
import { FileChooser } from "@ionic-native/file-chooser";
import { LibraryMusicSharp, CollectionsBookmarkSharp, QueueMusicSharp, MenuBookSharp } from "@material-ui/icons";

function Playlistv() {
 let { path, url } = useRouteMatch();
 const [playList, dispatch] = useContext(Playlist);
 const [duration, setDuration] = useState(0);
 const [song, setSong] = useContext(Mediasn);
 const [cposition, setCposition] = useContext(Mediat);

 const [file, setFile] = useContext(Mediap);
 const [ppb, setPpb] = useContext(Medias);
 const [select, setSelect] = useState(false);

 let history = useHistory();
 let location = useLocation();

 const [pstate, setPstate] = useState(false);
 const [showAlert, setShowAlert] = useState(false);
 const [showAlert2, setShowAlert2] = useState(false);
 const [repeat, setRepeat] = useLocal("rb", "all");
 const [shuffle, setShuffle] = useLocal("sb", true);
 let inputs = [];
 const [clr, setClr] = useContext(Colour);
 let color = "";
 if (clr) color = "white";
 let color2;
 if (clr) color2 = "#FFEB3B";
 else color2 = "#00CBFE";
 let color3;
 if (clr) color3 = "black";
 else color3 = "white";
 let color4;
 if (clr) color4 = "warning";
 else color4 = "primary";
 let color5;
 if (clr) color5 = "medium";
 else color5 = "secondary";

 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 playList.map((ele) => {
  inputs.push({
   name: ele.name,
   type: "radio",
   label: ele.name,
   value: ele.name,
  });
 });
 inputs.push({
  name: "New Playlist",
  type: "radio",
  label: "New Playlist",
  value: "New Playlist",
 });

 useEffect(() => {
  if (duration) {
   if (ppb) {
    file.play();
   }
  }
 }, [duration]);

 const useStyles = makeStyles({
  slider: {
   margin: "20px 10px 5px 10px",
   padding: "0 0 0 0",
   width: "95%",
   display: "block",
  },
 });
 const [showToast, setShowToast] = useState(false);
 const [toastText, setToastText] = useState();
 const classes = useStyles();
 function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s].filter((a) => a).join(":");
 }

 function filechooser(folder) {
  FileChooser.open()
   .then((uri) => {
    FilePath.resolveNativePath(uri)
     .then((filePath) => {
      let ind1 = filePath.lastIndexOf("/");
      let ind2 = filePath.lastIndexOf(".");

      dispatch({ type: "add", folder: folder, name: filePath.slice(ind1 + 1, ind2), path: filePath });
     })
     .catch((err) => {
      setToastText("Error occured, try again later");
      setShowToast(true);
     });
   })
   .catch((e) => {
    setToastText("Error occured, try again later");
    setShowToast(true);
   });
 }

 function play() {
  if (duration) {
   if (!ppb) {
    if (!pstate) {
     file.play();
     file.seekTo(cposition * 1000);
     setPstate(true);
     setPpb(true);
    } else {
     file.play();
     setPpb(true);
    }
   } else {
    file.pause();

    setPpb(false);
   }
  }
 }

 function nextSong() {
  playList.map((dele) => {
   dele.songs.map((ele, i) => {
    if (song.name === ele.name) {
     if (dele.songs.length === 1) {
      file.seekTo(1);
     } else {
      if (shuffle) {
       let rand = i;
       while (rand === i) {
        rand = Math.floor(Math.random() * dele.songs.length);
       }
       file.pause();
       file.seekTo(1);
       setCposition(0);
       setSong({ name: dele.songs[rand].name, path: dele.songs[rand].path, fold: dele.name });
      } else {
       if (i === dele.songs.length - 1) {
        file.pause();
        file.seekTo(1);
        setCposition(0);
        setSong({ name: dele.songs[0].name, path: dele.songs[0].path, fold: dele.name });
       } else {
        file.pause();
        file.seekTo(1);
        setCposition(0);
        setSong({ name: dele.songs[i + 1].name, path: dele.songs[i + 1].path, fold: dele.name });
       }
      }
     }
    }
   });
  });
 }

 function prevSong() {
  playList.map((dele) => {
   dele.songs.map((ele, i) => {
    if (song.name === ele.name) {
     if (dele.songs.length === 1) {
      file.seekTo(1);
     } else {
      if (shuffle) {
       let rand = i;
       while (rand === i) {
        rand = Math.floor(Math.random() * dele.songs.length);
       }
       file.pause();
       file.seekTo(1);
       setCposition(0);
       setSong({ name: dele.songs[rand].name, path: dele.songs[rand].path, path: dele.name });
      } else {
       if (i === 0) {
        file.pause();
        file.seekTo(1);
        setCposition(0);
        setSong({ name: dele.songs[dele.songs.length - 1].name, path: dele.songs[dele.songs.length - 1].path, fold: dele.name });
       } else {
        file.pause();
        file.seekTo(1);
        setCposition(0);
        setSong({ name: dele.songs[i - 1].name, path: dele.songs[i - 1].path, fold: dele.name });
       }
      }
     }
    }
   });
  });
 }

 const handleSliderChange = (event, newValue) => {
  file.seekTo(newValue * 1000);
  setCposition(newValue);
 };

 setTimeout(
  function () {
   if (duration) {
    if (ppb) {
     file.getCurrentPosition().then((position) => {
      setCposition(position);
      if (file.getDuration() - position <= 1) {
       if (repeat === "one") {
        file.seekTo(1);
       } else {
        playList.map((dele) => {
         dele.songs.map((ele, i) => {
          if (song.name === ele.name) {
           if (dele.songs.length === 1) {
            if (repeat === "none") {
             file.pause();
             file.seekTo(1);
             setCposition(0);
             setPpb(!ppb);
            } else file.seekTo(1);
           } else {
            if (shuffle) {
             let rand = i;
             while (rand === i) {
              rand = Math.floor(Math.random() * dele.songs.length);
             }
             file.pause();
             file.seekTo(1);
             setCposition(0);
             setSong({ name: dele.songs[rand].name, path: dele.songs[rand].path, fold: dele.name });
            } else {
             if (repeat === "all") {
              if (i === dele.songs.length - 1) {
               file.pause();
               file.seekTo(1);
               setCposition(0);
               setSong({ name: dele.songs[0].name, path: dele.songs[0].path, fold: dele.name });
              } else {
               file.pause();
               file.seekTo(1);
               setCposition(0);
               setSong({ name: dele.songs[i + 1].name, path: dele.songs[i + 1].path, fold: dele.name });
              }
             } else if (repeat === "none") {
              if (i === dele.songs.length - 1) {
               file.pause();
               file.seekTo(1);
               setCposition(0);
               setPpb(!ppb);
              } else {
               file.pause();
               file.seekTo(1);
               setCposition(0);
               setSong({ name: dele.songs[i + 1].name, path: dele.songs[i + 1].path, fold: dele.name });
              }
             }
            }
           }
          }
         });
        });
       }
      }
     });
    }
   }
  },

  1000
 );

 useEffect(() => {
  if (file) {
   file.play();
   file.setVolume("0.0");

   file.getCurrentPosition().then((position) => {
    if (position >= 0) {
     file.pause();

     file.setVolume("1.0");
     setDuration(formatTime(file.getDuration().toFixed(0)));
    } else {
     setDuration(0);
    }
   });
  }
 }, [file]);

 return (
  <div>
   <Switch location={location}>
    <Route exact path={path}>
     <div>
      <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
       <IonButtons style={{ marginLeft: "10px" }} slot="start">
        <IonLabel style={{ fontFamily: `${fon}` }}>Playlists</IonLabel>
       </IonButtons>

       {!select ? (
        <IonButtons slot="end" onClick={() => setShowAlert(true)}>
         <IonButton>
          <AddBoxSharp />
         </IonButton>
        </IonButtons>
       ) : null}

       {select ? (
        <IonButtons
         style={{ margin: "8px" }}
         slot="end"
         onClick={() => {
          playList.map((dele) => {
           if (dele.isChecked) {
            dele.songs.map((ele) => {
             if (song.name === ele.name) {
              file.pause();
              setSong({ name: "", path: "", fold: "" });
              setCposition(0);
             }
            });
           }
          });

          dispatch({ type: "delfold" });
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }} style={{ margin: "3px" }}>
          {"Remove"}{" "}
         </IonLabel>
        </IonButtons>
       ) : (
        <p></p>
       )}

       {!select ? (
        <IonButtons
         onClick={() => {
          setSelect(true);
          file.pause();
          setPpb(false);
         }}
         slot="end"
        >
         <IonButton>
          <IndeterminateCheckBoxOutlined />
         </IonButton>
        </IonButtons>
       ) : (
        <p></p>
       )}

       {select ? (
        <IonButtons
         onClick={() => {
          playList.map((ele) => {
           ele.isChecked = false;
          });

          setSelect(false);
         }}
         slot="end"
        >
         <IonLabel style={{ fontFamily: `${fon}` }}>Done</IonLabel>
        </IonButtons>
       ) : (
        <p></p>
       )}
      </IonToolbar>
      <div style={{ height: "58px" }}></div>
      {playList.length === 0 ? <p style={{ textAlign: "center", color: `${color}`, fontFamily: `${fon}` }}>Please add Songs to play them here</p> : null}

      {playList.map((ele, i) => {
       return (
        <IonItem
         color={clr}
         onClick={() => {
          if (!select) history.push(`${url}/${i}`);
         }}
        >
         <IonLabel style={{ fontFamily: `${fon}` }}>{ele.name} </IonLabel>

         {select ? (
          <IonCheckbox
           checked={ele.isChecked}
           onIonChange={(e) => {
            ele.isChecked = e.detail.checked;
           }}
          />
         ) : (
          <p></p>
         )}
        </IonItem>
       );
      })}
     </div>
    </Route>
    <Route path={`${path}/:ind`}>
     <Psub />
    </Route>
   </Switch>

   <IonToolbar color={clr} className="foot2">
    <Slider
     className={classes.slider}
     value={cposition}
     onChange={handleSliderChange}
     aria-labelledby="continuous-slider"
     min={0}
     max={duration ? file.getDuration() - 1 : 0}
    />

    <IonLabel style={{ display: "block", fontSize: "13px", margin: 0, border: 0, padding: 0, fontFamily: `${fon}` }}>{song.fold + "-" + song.name}</IonLabel>
    <div style={{ display: "flex", justifyContent: "center" }}>
     <IonLabel style={{ fontFamily: `${fon}` }} className="label">
      {" "}
      {cposition >= 0 ? formatTime(cposition.toFixed(0)) : "0:00"}
     </IonLabel>

     <IonButton color={shuffle ? color4 : color5} onClick={() => setShuffle(!shuffle)}>
      <Shuffle style={{ fontSize: 18 }} />
     </IonButton>

     <IonButton color={clr ? "warning" : ""} onClick={prevSong}>
      <ArrowBackIos style={{ fontSize: 18 }} />
     </IonButton>
     <IonButton color={clr ? "warning" : ""} onClick={play}>
      {ppb ? <PauseCircleOutline style={{ fontSize: 18 }} /> : <PlayCircleOutline style={{ fontSize: 18 }} />}
     </IonButton>

     <IonButton color={clr ? "warning" : ""} onClick={nextSong}>
      <ArrowForwardIos style={{ fontSize: 18 }} />
     </IonButton>

     {repeat === "none" ? (
      <IonButton color={clr ? "medium" : "secondary"} onClick={() => setRepeat("one")}>
       {" "}
       <Repeat style={{ fontSize: 18 }} />{" "}
      </IonButton>
     ) : null}
     {repeat === "one" ? (
      <IonButton color={clr ? "warning" : ""} onClick={() => setRepeat("all")}>
       {" "}
       <RepeatOneSharp style={{ fontSize: 18 }} />{" "}
      </IonButton>
     ) : null}
     {repeat === "all" ? (
      <IonButton color={clr ? "warning" : ""} onClick={() => setRepeat("none")}>
       {" "}
       <Repeat style={{ fontSize: 18 }} />{" "}
      </IonButton>
     ) : null}

     <IonLabel style={{ fontFamily: `${fon}` }} className="label">
      {" "}
      {duration ? duration : "0:00"}
     </IonLabel>
    </div>
   </IonToolbar>

   <IonToolbar className="tab" color={clr ? "warning" : "primary"}>
    <IonSegment value="default">
     <IonSegmentButton onClick={() => history.push("/iskcon")}>
      <QueueMusicSharp />
     </IonSegmentButton>
     <IonSegmentButton onClick={() => history.push("/topics")}>
      <MenuBookSharp />
     </IonSegmentButton>
     <IonSegmentButton value="default" onClick={() => history.push("/playlist")}>
      <LibraryMusicSharp />
     </IonSegmentButton>
     <IonSegmentButton onClick={() => history.push("/bookmarks")}>
      <CollectionsBookmarkSharp />
     </IonSegmentButton>
    </IonSegment>
   </IonToolbar>
   <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastText} duration={2000} />

   <IonAlert
    isOpen={showAlert}
    onDidDismiss={() => setShowAlert(false)}
    cssClass="my-custom-class"
    header={"Add a Song from device"}
    inputs={inputs}
    buttons={[
     {
      text: "Cancel",
      role: "cancel",
      cssClass: "secondary",
      handler: () => {},
     },
     {
      text: "Ok",
      handler: (res) => {
       if (res === "New Playlist") {
        setShowAlert2(true);
       } else {
        filechooser(res);
       }
      },
     },
    ]}
   />

   <IonAlert
    isOpen={showAlert2}
    onDidDismiss={() => setShowAlert2(false)}
    cssClass="my-custom-class"
    header={"New Playlist"}
    inputs={[{ name: "newplay", type: "text", placeholder: "New Playlist" }]}
    buttons={[
     {
      text: "Cancel",
      role: "cancel",
      cssClass: "secondary",
      handler: () => {},
     },
     {
      text: "Ok",
      handler: (res) => {
       filechooser(res.newplay);
      },
     },
    ]}
   />
  </div>
 );
}

export default Playlistv;
