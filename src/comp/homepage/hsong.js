import React, { useContext, useEffect, useRef, useState } from "react";
import { BookMark, IskconContent, Playlist, BookContent, Mediap, Tsize, View, Colour, FontType } from "../global";
import { useHistory, useParams } from "react-router-dom";
import ScrollToTop from "../scroll";
import { IonActionSheet, IonButton, IonAlert, IonLabel, IonToolbar, IonButtons, IonCard, IonCardContent, IonToast, IonItem } from "@ionic/react";

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
} from "@material-ui/icons";

import { motion } from "framer-motion";

import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { Downloader } from "@ionic-native/downloader";
import { Media } from "@ionic-native/media";
import { Menu } from "@material-ui/core";
import { useLocal } from "../lshooks";

function Csong(props) {
 const [showActionSheet, setShowActionSheet] = useState(false);

 const [showAlert, setShowAlert] = useState(false);
 const [showAlert2, setShowAlert2] = useState(false);
 const [showAlert3, setShowAlert3] = useState(false);
 const [showAlert4, setShowAlert4] = useState(false);
 const content = useContext(BookContent);
 const [repeat, setRepeat] = useLocal("rb2", "yes");
 const [file2, setFile2] = useContext(Mediap);
 const [tsize, setTsize] = useContext(Tsize);
 const [view, setView] = useContext(View);
 const [iskcon, setIskcon] = useContext(IskconContent);
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";
 let { ind } = useParams();

 let dnind = ind.slice(0, ind.indexOf("_"));

 let nind;

 if (isNaN(dnind)) {
  for (let i in iskcon.songs) {
   if (iskcon.songs[i].name === dnind) {
    nind = i;
   }
  }
 } else nind = Number(dnind);

 let iname = ind.slice(ind.indexOf("_") + 1, ind.indexOf("_", ind.indexOf("_") + 1));
 let i1;
 for (let i in content) {
  if (content[i].name === iname) {
   i1 = Number(i);
  }
 }
 let i2, id;
 if (i1 !== undefined) {
  if (content[i1].chap.length > 0) {
   i2 = Number(ind.slice(ind.indexOf("_", ind.indexOf("_") + 1) + 1, ind.lastIndexOf("_")));
  }
  id = Number(ind.slice(ind.lastIndexOf("_") + 1));
 }

 const audi = useRef();
 const [dur, setDur] = useState();
 const [current, setCurrent] = useState(0);
 const [ppb, setPpb] = useState(false);
 let vtm;
 if (view === "2") vtm = false;
 else vtm = true;
 const [vtb, setVtb] = useState(vtm);
 let index = 1;
 let present = 0;
 let iarr = [];
 let history = useHistory();
 const [showToast, setShowToast] = useState(false);
 const [toastText, setToastText] = useState();
 const [file, setFile] = props.value;
 const [duration, setDuration] = useState();
 const [cposition, setCposition] = useState(0);
 const [playList, dispatch] = useContext(Playlist);
 const [bookMark, dispatch2] = useContext(BookMark);
 const [anchorEl, setAnchorEl] = useState(null);
 const [devi, setDevi] = useState(iskcon.songs[nind].dflink);
 const [clr, setClr] = useContext(Colour);
 let color;
 if (clr) color = "#ffdf00";
 else color = "#00CBFE";
 let color2;
 if (clr) color2 = "";
 else color2 = "#04010f";
 let index2 = 1;
 let present2 = 0;
 let iarr2 = [];
 let left = false;
 let wwmb;
 if (view === "3" && i1 !== undefined) wwmb = true;
 else wwmb = false;
 const [wwm, setWwm] = useState(wwmb);

 let inputs = [];

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

 let inputs2 = [];
 bookMark.map((ele) => {
  inputs2.push({
   name: ele.name,
   type: "radio",
   label: ele.name,
   value: ele.name,
  });
 });
 inputs2.push({
  name: "New Bookmark",
  type: "radio",
  label: "New Bookmark",
  value: "New Bookmark",
 });

 var request = {
  uri: iskcon.songs[nind].link[devi].linkaddress,
  title: iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname,
  description: "",
  mimeType: "",
  visibleInDownloadsUi: true,
  notificationVisibility: 0,
  destinationInExternalPublicDir: {
   dirType: "Vaishnava Songs",
   subPath: iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname + ".mp3", //Path within the external directory, including the destination filename
  },
  headers: [{ header: "Authorization", value: "Bearer iaksjfd89aklfdlkasdjf" }],
 };

 // useEffect(()=>{

 // return (()=>{

 //   file.pause();
 // },[])

 useEffect(() => {
  setFile(Media.create("file:///storage/emulated/0/Vaishnava Songs/" + iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname + ".mp3"));
 }, [devi]);

 useEffect(() => {
  if (file) {
   file.play();
   file.getCurrentPosition().then((position) => {
    if (position >= 0) {
     file.pause();
     setDuration(formatTime(file.getDuration().toFixed(0)));
    } else {
     setDuration(0);
    }
   });
  }
 }, [file]);

 function download() {
  setAnchorEl(null);

  if (duration) {
   setToastText("Song is already Downloaded");
   setShowToast(true);
  } else {
   setToastText("Downloading started");
   setShowToast(true);

   Downloader.download(request)
    .then((location) => {
     setShowToast(false);
     setToastText("File downloaded, please check in Vaishnava Songs folder");
     setShowToast(true);
     let diskcon = { ...iskcon };

     setIskcon(diskcon);
    })
    .catch((err) => {
     setShowToast(false);
     setToastText("Error occured while downloading, try again later");
     setShowToast(true);
    });
  }
 }

 function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s].filter((a) => a).join(":");
 }

 function goback() {
  history.goBack();
 }

 setTimeout(
  function () {
   if (duration) {
    file.getCurrentPosition().then((position) => {
     setCposition(position);

     if (file.getDuration() - position <= 1) {
      if (repeat === "yes") {
       file.seekTo(1);
      } else setPpb(false);
     }
    });
   }
  },

  1000
 );

 useEffect(() => {
  if (audi.current) {
   audi.current.onloadedmetadata = () => {
    if (audi.current) {
     setDur(audi.current.duration);
    }
   };
  }
 }, [audi.current]);

 const handleSliderChange = (event, newValue) => {
  if (duration) {
   file.seekTo(newValue * 1000);
   setCposition(newValue);
  } else {
   if (audi.current) {
    audi.current.currentTime = newValue;
   }

   setCurrent(newValue);
  }
 };

 let fun = iskcon.scontent.slice(iskcon.songs[nind].sindex, iskcon.songs[nind].lindex);

 while (true) {
  if (fun.indexOf("(" + index.toString() + ")", present) !== -1) {
   present = fun.indexOf("(" + index.toString() + ")", present);
   iarr.push(index.toString());
   index++;
  } else {
   break;
  }
 }
 let fun2;
 let ztextr;
 if (i1 !== undefined) {
  let id2 =
   content[i1].chap.length > 0
    ? id + 1 >= content[i1].chap[i2].song.length
      ? content[i1].chap[i2].eindex
      : content[i1].chap[i2].song[id + 1].index
    : id + 1 >= content[i1].song.length
    ? content[i1].inside.length
    : content[i1].song[id + 1].index;

  fun2 =
   content[i1].chap.length > 0 ? content[i1].inside.slice(content[i1].chap[i2].song[id].index, id2) : content[i1].inside.slice(content[i1].song[id].index, id2);

  while (true) {
   if (fun2.indexOf("Text " + index2.toString(), present2) !== -1) {
    present2 = fun2.indexOf("Text " + index2.toString(), present2);
    iarr2.push(index2.toString());
    index2++;
   } else {
    break;
   }
  }

  if (fun2.indexOf("(refrain)") !== -1) {
   ztextr = fun2.slice(fun2.indexOf("(refrain)"), fun2.indexOf("Text 1")).split(/\r\n|\n/);
  }
 }

 function changeView() {
  setVtb(!vtb);
 }

 function addtobookmark(folder) {
  let check = false;
  bookMark.map((dele) => {
   if (dele.name === folder) {
    dele.songs.map((ele) => {
     if (ele.name === iskcon.songs[nind].name) {
      check = true;
      setToastText("Song is already bookmark");
      setShowToast(true);
     }
    });
   }
  });
  if (!check) {
   dispatch2({ type: "add", folder: folder, name: iskcon.songs[nind].name, path: `/iskcon/songs/${iskcon.songs[nind].name}_${iskcon.songs[nind].book}` });

   setToastText("Added to the Bookmark");
   setShowToast(true);
  }
 }

 function addtoplaylist(folder) {
  if (duration) {
   let check = false;
   playList.map((dele) => {
    if (dele.name === folder) {
     dele.songs.map((ele) => {
      if (ele.name === iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname) {
       check = true;
       setToastText("Song is already added to the playlist");
       setShowToast(true);
      }
     });
    }
   });
   if (!check) {
    dispatch({
     type: "add",
     folder: folder,
     name: iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname,
     path: "file:///storage/emulated/0/Vaishnava Songs/" + iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname + ".mp3",
    });
    setToastText("Added to the playlist");
    setShowToast(true);
   }
  } else {
   setToastText("Downloading started and after downloading it will added to the playlist");
   setShowToast(true);

   Downloader.download(request)
    .then((location) => {
     setShowToast(false);
     setToastText("Added to the playlist");
     setShowToast(true);
     dispatch({
      type: "add",
      folder: folder,
      name: iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname,
      path: "file:///storage/emulated/0/Vaishnava Songs/" + iskcon.songs[nind].name + "-" + iskcon.songs[nind].link[devi].linkname + ".mp3",
     });
    })
    .catch((err) => {
     setShowToast(false);
     setToastText("Error occured while downloading, try again later");
     setShowToast(true);
    });
  }
 }

 function playon() {
  if (!navigator.onLine) {
   setToastText("You are currently offline, turn on your internet connection to play this song");
   setShowToast(true);
  } else {
   if (file2) {
    file2.pause();
   }

   if (audi.current) {
    if (!ppb) {
     if (audi.current.duration) {
      audi.current.play();

      setPpb(!ppb);
     } else {
      setToastText("loading, please wait or check your internet connection or else try again later");
      setShowToast(true);
     }
    }

    if (ppb) {
     audi.current.pause();

     setPpb(!ppb);
    }
   }
  }
 }

 function playoff() {
  if (!ppb) {
   if (file2) {
    file2.pause();
   }
   file.play();
   setPpb(true);
  }
  if (ppb) {
   file.pause();
   setPpb(false);
  }
 }

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
  <div>
   <div style={{ height: "35px" }}></div>
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start">
     <IonButton onClick={goback}>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="start">
     <IonLabel style={{ fontFamily: `${fon}` }}>{iskcon.songs[nind].name}</IonLabel>
    </IonButtons>
    {!wwm ? (
     <IonButtons slot="end">
      <IonButton onClick={changeView}>{vtb ? <ViewAgendaSharp /> : <ViewHeadlineSharp />}</IonButton>
     </IonButtons>
    ) : null}

    <IonButtons slot="end">
     <IonButton
      onclick={() => {
       setWwm(!wwm);
      }}
     >
      <MenuBookSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="end">
     <IonButton aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>
      <MoreVert />
     </IonButton>
    </IonButtons>
   </IonToolbar>

   <motion.div
    exit={{
     opacity: 0,
    }}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ type: "linear", duration: 1 }}
   >
    <ScrollToTop />

    {!wwm ? (
     <p>
      {" "}
      {vtb ? (
       <p style={{ backgroundColor: `${color}`, padding: "4px 0 2px 0", fontFamily: `${fon}` }}>
        {iarr.map((sent, i) => {
         let ind1 = fun.indexOf("(" + sent + ")");
         let ind2 = fun.indexOf(i < iarr.length - 1 ? "(" + iarr[i + 1] + ")" : "TRANSLATION");

         let zen = fun.slice(ind1, ind2);
         let ztext = zen.split(/\r\n|\n/);

         let ind3 = fun.indexOf(sent + ")", fun.indexOf("TRANSLATION"));
         let ind4 = fun.indexOf(i < iarr.length - 1 ? iarr[i + 1] + ")" : "Song Name", fun.indexOf("TRANSLATION"));
         let zen1;
         if (sent <= 9) {
          zen1 = fun.slice(ind3 + 2, ind4);
         } else {
          zen1 = fun.slice(ind3 + 3, ind4);
         }
         let ztext1 = zen1.split(/\r\n|\n/);

         if (i === 0 && fun.indexOf("(refrain)") !== -1) {
          let indr = fun.indexOf("(refrain)");

          let indR = fun.indexOf("Refrain:");

          let zenr = fun.slice(indr, ind1);
          let ztextr = zenr.split(/\r\n|\n/);

          let zenR = fun.slice(indR, ind3);
          let ztextR = zenR.split(/\r\n|\n/);

          return (
           <div>
            <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
             <IonCardContent>
              {ztextr.map((vad) => {
               return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
              })}
              {indR !== -1 ? <br /> : ""}
              {ztextR.map((vad1) => {
               return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
              })}
             </IonCardContent>
            </IonCard>

            <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
             <IonCardContent>
              {ztext.map((vad) => {
               return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
              })}
              <br />
              {ztext1.map((vad1) => {
               return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
              })}
             </IonCardContent>
            </IonCard>
           </div>
          );
         }

         return (
          <IonCard color={clr} style={{ fontFamily: `${fon}`, color: `${color2}` }}>
           <IonCardContent>
            {ztext.map((vad) => {
             return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
            })}
            <br />
            {ztext1.map((vad1) => {
             return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
            })}
           </IonCardContent>
          </IonCard>
         );
        })}
       </p>
      ) : (
       <p style={{ backgroundColor: `${color}`, padding: "4px 0 2px 0" }}>
        <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
         <IonCardContent>
          {iarr.map((sent, i) => {
           let ind1 = fun.indexOf("(" + sent + ")");
           let ind2 = fun.indexOf(i < iarr.length - 1 ? "(" + iarr[i + 1] + ")" : "TRANSLATION");

           let zen = fun.slice(ind1, ind2);
           let ztext = zen.split(/\r\n|\n/);

           if (i === 0 && fun.indexOf("(refrain)") !== -1) {
            let indr = fun.indexOf("(refrain)");
            let zenr = fun.slice(indr, ind1);
            let ztextr = zenr.split(/\r\n|\n/);

            return (
             <div>
              <p>
               {ztextr.map((vad) => {
                return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
               })}
              </p>

              <p>
               {ztext.map((vad) => {
                return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
               })}
              </p>
             </div>
            );
           }

           return (
            <p>
             {ztext.map((vad) => {
              return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
             })}
            </p>
           );
          })}{" "}
         </IonCardContent>
        </IonCard>

        <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
         <IonCardContent>
          <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Translation</p>
          {iarr.map((sent, i) => {
           let ind3 = fun.indexOf(sent + ")", fun.indexOf("TRANSLATION"));
           let ind4 = fun.indexOf(i < iarr.length - 1 ? iarr[i + 1] + ")" : "Song Name", fun.indexOf("TRANSLATION"));

           let zen1 = fun.slice(ind3, ind4);
           let ztext1 = zen1.split(/\r\n|\n/);
           if (i === 0 && fun.indexOf("(refrain)") !== -1) {
            let indR = fun.indexOf("Refrain:");

            let zenR = fun.slice(indR, ind3);
            let ztextR = zenR.split(/\r\n|\n/);

            return (
             <div>
              <p>
               <br />
               {ztextR.map((vad1) => {
                return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
               })}
              </p>

              <p>
               <br />
               {ztext1.map((vad1) => {
                return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
               })}
              </p>
             </div>
            );
           }

           return (
            <p>
             <br />
             {ztext1.map((vad1) => {
              return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
             })}
            </p>
           );
          })}
         </IonCardContent>
        </IonCard>
       </p>
      )}
     </p>
    ) : (
     <p style={{ backgroundColor: `${color}`, padding: "4px 0 2px 0", fontFamily: `${fon}` }}>
      {i1 !== undefined ? (
       <div>
        {" "}
        {fun2.indexOf("(refrain)") !== -1 ? (
         <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
          <IonCardContent>
           {ztextr.map((vad, i) => {
            if (vad.indexOf(";") !== -1) {
             left = true;
            }

            if (vad.indexOf(";") !== -1) {
             let dk = vad.length - 1;

             while (vad[dk] === " ") {
              dk--;
             }

             if (vad.indexOf(".") === -1 && vad[dk] !== "!" && vad[dk] !== "?") {
              ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
             } else {
              return (
               <div>
                <br />
                <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
               </div>
              );
             }
            } else if (left && vad.indexOf(";") === -1) {
             if (i !== ztextr.length - 1) {
              ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
             } else {
              return (
               <div>
                <br />
                <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
               </div>
              );
             }
            } else {
             let start = 0;
             while (true) {
              if (vad[start] === " ") {
               start++;
              } else {
               break;
              }
             }

             if (fun2.indexOf(";") === -1 && (vad[start] === "“" || vad[start] === "." || (vad[start] >= "A" && vad[start] <= "Z"))) {
              if (i !== ztextr.length - 1) {
               ztextr[i + 1] = ztextr[i].concat(ztextr[i + 1]);
              } else {
               return (
                <div>
                 <br />
                 <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
                </div>
               );
              }
             } else {
              return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
             }
            }
           })}
          </IonCardContent>
         </IonCard>
        ) : null}
       </div>
      ) : null}
      {i1 !== undefined ? (
       iarr2.map((sent, i) => {
        let test = fun2.indexOf("Text " + iarr2[iarr2.length - 1]);

        if (fun2.indexOf("Text 1", test + 15) === -1) {
         let ind1 = fun2.indexOf("Text " + sent);
         let ind2 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1]) : fun2.length;

         let zen = "";
         if (i < 9) {
          zen = fun2.slice(ind1 + 6, ind2);
         } else if (i < 100) {
          zen = fun2.slice(ind1 + 7, ind2);
         } else {
          zen = fun2.slice(ind1 + 8, ind2);
         }

         let ztext = zen.split(/\r\n|\n/);

         left = false;

         return (
          <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
           <IonCardContent>
            <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Text {sent} </p>
            {ztext.map((vad, i) => {
             if (vad.indexOf(";") !== -1) {
              left = true;
             }

             if (vad.indexOf(";") !== -1) {
              let dk = vad.length - 1;

              while (vad[dk] === " ") {
               dk--;
              }

              if (vad.indexOf(".") === -1 && vad[dk] !== "!" && vad[dk] !== "?") {
               ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
              } else {
               return (
                <div>
                 <br />
                 <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
                </div>
               );
              }
             } else if (left && vad.indexOf(";") === -1) {
              if (vad.indexOf("Text " + sent) !== -1) {
               vad = vad.replace("Text " + sent, "");
              }
              if (i !== ztext.length - 1) {
               ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
              } else {
               return (
                <div>
                 <br />
                 <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
                </div>
               );
              }
             } else {
              let start = 0;
              while (true) {
               if (vad[start] === " ") {
                start++;
               } else {
                break;
               }
              }

              if (fun2.indexOf(";") === -1 && (vad[start] === "“" || vad[start] === "." || (vad[start] >= "A" && vad[start] <= "Z"))) {
               if (i !== ztext.length - 1) {
                ztext[i + 1] = ztext[i].concat(ztext[i + 1]);
               } else {
                return (
                 <div>
                  <br />
                  <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
                 </div>
                );
               }
              } else {
               return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
              }
             }
            })}
           </IonCardContent>
          </IonCard>
         );
        } else {
         let ind1 = fun2.indexOf("Text " + sent);
         let ind2 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1]) : fun2.indexOf("Text 1 ", ind1);

         let zen = "";
         if (i < 9) {
          zen = fun2.slice(ind1 + 6, ind2);
         } else {
          zen = fun2.slice(ind1 + 7, ind2);
         }
         let ztext = zen.split(/\r\n|\n/);

         let ind3 = fun2.indexOf("Text " + sent, ind1 + 8);
         let ind4 = i < iarr2.length - 1 ? fun2.indexOf("Text " + iarr2[i + 1], ind2 + 8) : fun2.length;

         let zen1 = fun2.slice(ind3, ind4);
         let ztext1 = zen1.split(/\r\n|\n/);
         return (
          <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
           <IonCardContent>
            <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Text {sent}</p>
            {ztext.map((vad, i) => {
             return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
            })}
            {ind3 !== -1 ? <br /> : <p></p>}
            {ztext1.map((vad1) => {
             if (vad1.indexOf("Text " + sent) !== -1) {
              vad1 = vad1.replace("Text " + sent, "");
             }
             return <p style={{ fontSize: `${tsize}px` }}>{vad1}</p>;
            })}
           </IonCardContent>
          </IonCard>
         );
        }
       })
      ) : (
       <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
        <IonCardContent>
         <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>
          Sorry Prabhuji/Mataji, we are currently not having the word to word meanings for this Song
         </p>
        </IonCardContent>
       </IonCard>
      )}
     </p>
    )}

    <div style={{ height: "18px" }}></div>

    <IonActionSheet
     isOpen={showActionSheet}
     onDidDismiss={() => setShowActionSheet(false)}
     cssClass="my-custom-class"
     buttons={iskcon.songs[nind].link.map((link, i) => {
      return {
       text: link.linkname,
       handler: () => {
        if (duration) {
         file.pause();
        }
        if (audi.current) {
         audi.current.pause();
        }

        setPpb(false);
        setIskcon((prev) => {
         let dum = { ...prev };
         dum.songs[nind].dflink = i;
         return dum;
        });

        setDevi(i);
       },
      };
     })}
    ></IonActionSheet>
   </motion.div>

   <IonToolbar color={clr} className="foot">
    <Slider
     className={classes.slider}
     value={duration ? cposition : current}
     onChange={handleSliderChange}
     aria-labelledby="continuous-slider"
     min={0}
     max={duration ? file.getDuration() - 1 : dur}
    />
    <IonLabel style={{ display: "block", fontSize: "15px", margin: 0, border: 0, padding: 0, fontFamily: `${fon}` }}>
     {iskcon.songs[nind].link[devi].linkname}
    </IonLabel>
    <div style={{ display: "flex", justifyContent: "center" }}>
     <IonLabel style={{ fontFamily: `${fon}` }} className="label">
      {" "}
      {duration ? formatTime(cposition.toFixed(0)) : formatTime(current.toFixed(0))}{" "}
     </IonLabel>

     <IonButton color={clr ? "warning" : "primary"} onClick={() => setShowActionSheet(true)}>
      <Person style={{ fontSize: 18 }} />
     </IonButton>

     <IonButton
      color={clr ? "warning" : "primary"}
      onClick={() => {
       if (duration) {
        file.getCurrentPosition().then((position) => {
         if (position > 15) file.seekTo(position * 1000 - 15000);
         else file.seekTo(1);
        });
       } else {
        if (audi.current) audi.current.currentTime -= 15;
       }
      }}
     >
      <FastRewindSharp style={{ fontSize: 18 }} />
     </IonButton>
     <IonButton color={clr ? "warning" : "primary"} onClick={duration ? playoff : playon}>
      {ppb ? <PauseCircleOutline style={{ fontSize: 18 }} /> : <PlayCircleOutline style={{ fontSize: 18 }} />}
     </IonButton>

     <IonButton
      color={clr ? "warning" : "primary"}
      onClick={() => {
       if (duration) {
        file.getCurrentPosition().then((position) => {
         if (file.getDuration() - position > 16) file.seekTo(position * 1000 + 15000);
         else file.seekTo(file.getDuration() - 1);
        });
       } else {
        if (audi.current) audi.current.currentTime += 15;
       }
      }}
     >
      <FastForwardSharp style={{ fontSize: 18 }} />
     </IonButton>

     {repeat === "no" ? (
      <IonButton color={clr ? "medium" : "secondary"} onClick={() => setRepeat("yes")}>
       {" "}
       <RepeatOneSharp style={{ fontSize: 18 }} />{" "}
      </IonButton>
     ) : (
      <IonButton color={clr ? "warning" : "primary"} onClick={() => setRepeat("no")}>
       {" "}
       <RepeatOneSharp style={{ fontSize: 18 }} />{" "}
      </IonButton>
     )}

     {!duration ? (
      <IonLabel style={{ fontFamily: `${fon}` }} className="label">
       {" "}
       {audi.current ? (audi.current.duration ? formatTime(audi.current.duration.toFixed(0)) : "0:00") : "0:00"}{" "}
      </IonLabel>
     ) : (
      <IonLabel style={{ fontFamily: `${fon}` }} className="label">
       {" "}
       {duration}
      </IonLabel>
     )}
    </div>
   </IonToolbar>

   <audio
    onEnded={() => {
     if (repeat === "yes") {
      if (audi.current) audi.current.play();
     } else setPpb(false);
    }}
    onTimeUpdate={() => {
     setCurrent(audi.current.currentTime);
    }}
    ref={audi}
    src={iskcon.songs[nind].link[devi].linkaddress}
   >
    Your browser does not support the audio element.
   </audio>
   <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastText} duration={2000} />

   <IonAlert
    isOpen={showAlert}
    onDidDismiss={() => setShowAlert(false)}
    cssClass="my-custom-class"
    header={"Select a Playlist"}
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
        addtoplaylist(res);
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
    inputs={[
     {
      name: "newplay",
      type: "text",
      placeholder: "New Playlist",
     },
    ]}
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
       addtoplaylist(res.newplay);
      },
     },
    ]}
   />

   <IonAlert
    isOpen={showAlert3}
    onDidDismiss={() => setShowAlert3(false)}
    cssClass="my-custom-class"
    header={"Select a Bookmark"}
    inputs={inputs2}
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
       if (res === "New Bookmark") {
        setShowAlert4(true);
       } else {
        addtobookmark(res);
       }
      },
     },
    ]}
   />

   <IonAlert
    isOpen={showAlert4}
    onDidDismiss={() => setShowAlert4(false)}
    cssClass="my-custom-class"
    header={"New Bookmark"}
    inputs={[
     {
      name: "newmark",
      type: "text",
      placeholder: "New Bookmark",
     },
    ]}
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
       addtobookmark(res.newmark);
      },
     },
    ]}
   />

   <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
    <IonItem button onClick={download}>
     <IonLabel style={{ fontFamily: `${fon}` }}>Download current song</IonLabel>
    </IonItem>
    <IonItem
     button
     onClick={() => {
      setAnchorEl(null);
      setShowAlert(true);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Add to Playlist</IonLabel>
    </IonItem>
    <IonItem
     lines="none"
     button
     onClick={() => {
      setAnchorEl(null);
      setShowAlert3(true);
     }}
    >
     <IonLabel style={{ fontFamily: `${fon}` }}> Bookmark this Song</IonLabel>
    </IonItem>
   </Menu>
  </div>
 );
}

export default Csong;
