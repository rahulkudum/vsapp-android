import React, { useContext, useEffect, useState } from "react";
import { Playlist, Mediap, Medias, Mediasn, Mediat, Dplay, Colour, FontType } from "../global";

import { IonItem, IonReorderGroup, IonButton, IonLabel, IonToolbar, IonButtons, IonCheckbox, IonReorder, IonToast } from "@ionic/react";

import { TocSharp, AddBoxSharp, IndeterminateCheckBoxSharp, ArrowBackSharp } from "@material-ui/icons";

import { useHistory, useParams } from "react-router-dom";
import { FilePath } from "@ionic-native/file-path";
import { FileChooser } from "@ionic-native/file-chooser";

function Splaylist() {
 const [playList, dispatch] = useContext(Playlist);

 const [song, setSong] = useContext(Mediasn);
 const [cposition, setCposition] = useContext(Mediat);
 let { ind } = useParams();
 let nind = Number(ind);
 const [clr, setClr] = useContext(Colour);

 const [file, setFile] = useContext(Mediap);
 const [ppb, setPpb] = useContext(Medias);
 const [select, setSelect] = useState(false);

 const [dplaylist, setDplaylist] = useContext(Dplay);
 let [reo, setReo] = useState(true);
 let history = useHistory();
 const [showToast, setShowToast] = useState(false);
 const [toastText, setToastText] = useState();
 const [font, setFont] = useContext(FontType);
 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 useEffect(() => {
  dispatch({ type: "reorder", array: dplaylist });
  setDplaylist([]);
 }, []);

 function doReorder(e) {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively

  // dispatch({type:"reorder",from:playl[e.detail.from],to:playl[e.detail.to]});

  let dplay = [...dplaylist];
  dplay.push({ index: nind, from: e.detail.from, to: e.detail.to });

  setDplaylist(dplay);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder grousssss
  e.detail.complete();
 }

 function filechooser() {
  FileChooser.open()
   .then((uri) => {
    FilePath.resolveNativePath(uri)
     .then((filePath) => {
      let ind1 = filePath.lastIndexOf("/");
      let ind2 = filePath.lastIndexOf(".");

      dispatch({ type: "add", folder: playList[nind].name, name: filePath.slice(ind1 + 1, ind2), path: filePath });
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

 return (
  <div>
   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start" onClick={() => history.goBack()}>
     <IonButton>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="start">
     <IonLabel style={{ fontFamily: `${fon}` }}>{playList[nind].name} </IonLabel>
    </IonButtons>
    {!select ? (
     <IonButtons slot="end" onClick={filechooser}>
      <IonButton>
       <AddBoxSharp />
      </IonButton>
     </IonButtons>
    ) : null}

    {!select ? (
     <IonButtons slot="end" onClick={() => setReo(!reo)}>
      <IonButton>
       <TocSharp />
      </IonButton>
     </IonButtons>
    ) : null}
    {select ? (
     <IonButtons
      slot="end"
      style={{ margin: "8px" }}
      onClick={() => {
       playList[nind].songs.map((ele) => {
        if (ele.isChecked) {
         if (song.name === ele.name) {
          setSong({ name: "", path: "", fold: "" });
          setCposition(0);
         }
        }
       });

       dispatch({ type: "delsong", index: nind });
      }}
     >
      <IonLabel style={{ fontFamily: `${fon}` }}>Remove</IonLabel>
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
       <IndeterminateCheckBoxSharp />
      </IonButton>
     </IonButtons>
    ) : (
     <p></p>
    )}
    {select ? (
     <IonButtons
      onClick={() => {
       playList[nind].songs.map((ele) => {
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
   <IonReorderGroup disabled={reo} onIonItemReorder={doReorder}>
    {playList[nind].songs.map((ele, i) => {
     return (
      <IonItem
       color={clr}
       button
       onClick={() => {
        if (!select) {
         if (ele.name !== song.name) {
          file.pause();
          setCposition(0);
          setSong({ name: ele.name, path: ele.path, fold: playList[nind].name });
         } else {
          if (!ppb) {
           file.seekTo(cposition * 1000);
           file.play();
           setPpb(!ppb);
          }
         }
        }
       }}
      >
       <IonLabel style={{ fontFamily: `${fon}` }}>{ele.name} </IonLabel>
       <IonReorder slot="end" />
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
   </IonReorderGroup>
   <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastText} duration={2000} />
  </div>
 );
}

export default Splaylist;
