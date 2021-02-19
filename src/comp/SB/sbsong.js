import React, { useContext, useState } from "react";
import { Colour, Tsize, View, BookMark, FontType } from "../global";
import { IonToolbar, IonLabel, IonButtons, IonButton, IonCard, IonCardContent, IonAlert, IonToast } from "@ionic/react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { ViewAgendaSharp, MenuBookSharp, ArrowBackSharp, CollectionsBookmark } from "@material-ui/icons";
import ScrollToTop from "../scroll";
import { motion } from "framer-motion";

function SBP(props) {
 let { ind } = useParams();
 let arrs = ind.split("_");
 let i2 = Number(arrs[0]);
 let id = Number(arrs[1]);
 let history = useHistory();
 const [bookMark, dispatch2] = useContext(BookMark);
 const content = props.govardhan;
 let { path, url } = useRouteMatch();
 const [showToast, setShowToast] = useState(false);
 const [toastText, setToastText] = useState();
 const [clr, setClr] = useContext(Colour);
 let color;
 if (clr) color = "#FFEB3B";
 else color = "#00CBFE";
 let color2;
 if (clr) color2 = "";
 else color2 = "#04010f";
 const [tsize, setTsize] = useContext(Tsize);
 const [view, setView] = useContext(View);
 let vtm;
 if (view === "3") vtm = false;
 else vtm = true;
 const [vtb, setVtb] = useState(vtm);
 let wwmb;
 if (view === "2") wwmb = true;
 else wwmb = false;
 const [wwm, setWwm] = useState(wwmb);

 function changeView() {
  setVtb(!vtb);
 }

 const [font, setFont] = useContext(FontType);

 let fon;
 if (!font) fon = "Calibri";
 else fon = "Times New Roman";

 let present3 = -4;
 let index2 = 1;
 let present2 = 0;
 let iarr2 = [];
 let i1;
 let left;
 let lef;

 let id2 = id + 1 >= content.chap[i2].song.length ? content.chap[i2].eindex : content.chap[i2].song[id + 1].index;

 let fun2 = content.inside.slice(content.chap[i2].song[id].index, id2);

 while (true) {
  if (present2 === "-1" || present2 === -1) {
   break;
  }

  console.log(present2);
  //console.log(fun2.indexOf("Text",present2 ));

  present2 = fun2.indexOf("Text", fun2.indexOf("Text", present2) + 5);
  iarr2.push(index2.toString());
  index2++;
 }

 const [showAlert3, setShowAlert3] = useState(false);
 const [showAlert4, setShowAlert4] = useState(false);

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

 function addtobookmark(folder) {
  let name = content.chap[i2].song[id].name.slice(3);

  let check = false;
  bookMark.map((dele) => {
   if (dele.name === folder) {
    dele.songs.map((ele) => {
     if (ele.name === name) {
      check = true;
      setToastText("Song is already bookmark");
      setShowToast(true);
     }
    });
   }
  });
  if (!check) {
   dispatch2({ type: "add", folder: folder, name: name, path: url });

   setToastText("Added to the Bookmark");
   setShowToast(true);
  }
 }

 return (
  <div>
   <ScrollToTop />

   <IonToolbar className="ionhead" color={clr ? "warning" : "primary"}>
    <IonButtons slot="start">
     <IonButton onClick={() => history.goBack()}>
      <ArrowBackSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="start">
     <IonLabel style={{ fontSize: "16px", fontFamily: `${fon}` }}>
      {content.chap[i2].song[id].name.slice(3).slice(0, content.chap[i2].song[id].name.indexOf("(SB") - 3)}
     </IonLabel>
    </IonButtons>
    {!wwm ? (
     <IonButtons slot="end">
      <IonButton onClick={changeView}>
       <MenuBookSharp />
      </IonButton>
     </IonButtons>
    ) : null}

    <IonButtons slot="end">
     <IonButton
      onclick={() => {
       setWwm(!wwm);
      }}
     >
      <ViewAgendaSharp />
     </IonButton>
    </IonButtons>
    <IonButtons slot="end">
     <IonButton onClick={() => setShowAlert3(true)}>
      <CollectionsBookmark />
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
    <div style={{ height: "32px" }}></div>
    <p style={{ backgroundColor: `${color}`, padding: "6px 0 4px 0", fontFamily: `${fon}`, marginTop: "20px", marginBottom: 0 }}>
     {iarr2.map((sent, i) => {
      let ind1 = fun2.indexOf("Text", present3 + 4);
      present3 = ind1;
      let ind2 = i < iarr2.length - 1 ? fun2.indexOf("Text", ind1 + 4) : fun2.length;

      let zen = fun2.slice(ind1, ind2);

      let ztext = zen.split(/\r\n|\n/);

      left = false;

      return (
       <IonCard color={clr} style={{ color: `${color2}`, fontFamily: `${fon}` }}>
        <IonCardContent>
         <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>Text {sent} </p>
         {ztext.map((vad, i) => {
          if (i === 0) return null;

          if (vad.indexOf(";") !== -1) {
           left = true;
          }

          if (left && wwm) return null;

          if (vtb && ztext[i - 1].indexOf(";") === -1 && vad.indexOf(";") !== -1) return null;
          if (!left) {
           return <p style={{ textAlign: "center", fontSize: `${tsize}px` }}>{vad}</p>;
          }

          if (left & (vad !== "")) {
           return (
            <div>
             <br />
             <p style={{ fontSize: `${tsize}px` }}>{vad}</p>
            </div>
           );
          }
         })}
        </IonCardContent>
       </IonCard>
      );
     })}
    </p>

    <IonAlert
     isOpen={showAlert3}
     onDidDismiss={() => setShowAlert3(false)}
     cssClass="my-custom-class"
     header={"Select a Bookmark folder"}
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
     header={"New Bookamrk"}
     inputs={[{ name: "newmark", type: "text", placeholder: "New Bookmark" }]}
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
    <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastText} duration={2000} />
   </motion.div>
  </div>
 );
}

export default SBP;
