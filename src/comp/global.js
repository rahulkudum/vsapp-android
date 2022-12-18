import React, { createContext, useState, useEffect, useRef } from "react";
import { useLocal, useLocalr } from "./lshooks";
import { Media } from "@ionic-native/media";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;
export const BookContent = createContext();
export const BookContent2 = createContext();
export const IskconContent = createContext();
export const SearchBook = createContext();
export const Scroll = createContext();
export const Index = createContext();
export const Playlist = createContext();
export const Mediap = createContext();
export const Medias = createContext();
export const Mediasn = createContext();
export const Mediat = createContext();
export const Dplay = createContext();
export const BookMark = createContext();
export const Dbookmark = createContext();
export const TempleContent = createContext();
export const SPContent = createContext();
export const Prog = createContext();
export const Tsize = createContext();
export const View = createContext();
export const Colour = createContext();
export const FontType = createContext();

function reducer(state, action) {
 switch (action.type) {
  case "add":
   let dustate = [...state];
   let exsist = false;
   dustate.map((ele) => {
    if (ele.name === action.folder) {
     ele.songs.push({ name: action.name, path: action.path, isChecked: false });
     exsist = true;
    }
   });
   if (!exsist) {
    dustate.push({ name: action.folder, songs: [{ name: action.name, path: action.path, isChecked: false }], isChecked: false });
   }
   return dustate;

  case "delfold":
   return state.filter((ele) => !ele.isChecked);
  case "delsong":
   let dumstate = [...state];
   dumstate[action.index].songs = dumstate[action.index].songs.filter((ele) => !ele.isChecked);
   return dumstate;
  case "reorder":
   let dstate = [...state];

   action.array.map((ele) => {
    if (ele.from > ele.to) {
     dstate[ele.index].songs.splice(ele.to, 0, dstate[ele.index].songs[ele.from]);

     dstate[ele.index].songs.splice(ele.from + 1, 1);
     // console.log(dstate);
    }
    if (ele.to > ele.from) {
     dstate[ele.index].songs.splice(ele.to + 1, 0, dstate[ele.index].songs[ele.from]);
     dstate[ele.index].songs.splice(ele.from, 1);
    }
   });

   return dstate;

  default:
   throw new Error();
 }
}

function reducer2(state, action) {
 switch (action.type) {
  case "add":
   let dustate = [...state];
   let exsist = false;
   dustate.map((ele) => {
    if (ele.name === action.folder) {
     ele.songs.push({ name: action.name, path: action.path, isChecked: false });
     exsist = true;
    }
   });
   if (!exsist) {
    dustate.push({ name: action.folder, songs: [{ name: action.name, path: action.path, isChecked: false }], isChecked: false });
   }
   return dustate;

  case "delfold":
   return state.filter((ele) => !ele.isChecked);
  case "delsong":
   let dumstate = [...state];
   dumstate[action.index].songs = dumstate[action.index].songs.filter((ele) => !ele.isChecked);
   return dumstate;
  case "reorder":
   let dstate = [...state];

   action.array.map((ele) => {
    if (ele.from > ele.to) {
     dstate[ele.index].songs.splice(ele.to, 0, dstate[ele.index].songs[ele.from]);

     dstate[ele.index].songs.splice(ele.from + 1, 1);
     // console.log(dstate);
    }
    if (ele.to > ele.from) {
     dstate[ele.index].songs.splice(ele.to + 1, 0, dstate[ele.index].songs[ele.from]);
     dstate[ele.index].songs.splice(ele.from, 1);
    }
   });

   return dstate;

  default:
   throw new Error();
 }
}

export function GlobalProvider({ children }) {
 const [dplaylist, setDplaylist] = useState([]);
 const [dbookmark, setDbookmark] = useState([]);

 const books = [
  "Saranagati",
  "Gitavali",
  "Kalyanakalpataru",
  "Gitamala",
  "Baula Sangita",
  "Prarthana",
  "Prema Bhakti Chandrika",
  "Stavamrita Lahari",
  "Songs of the Vaisnava Acaryas",
  "More Songs of the Vaisnava Acaryas",
  "Sri Ksanada Gita Cintamani",
  "The Acaryas Songs Glorifying Lord Gauranga and Govinda",
  "Songs of Vaishnava Acaryas",
  "Sri Krsna Vijaya",
  "Krsna Lila Stava",
  "Gopala Campu",
 ];

 const books2 = [""]; // ("SBnew")
 const [content, setContent] = useLocal("book2", []);
 const [content2, setContent2] = useState({ chap: [], inside: "" });
 const [iskcon, setIskcon] = useLocal("iskcon2", { scontent: "", songs: [] });
 const [searchBook, setSearchBook] = useLocal("vswd", "");
 const [piskcon, setpiskcon] = useLocal("piskcon2", { scontent: "", songs: [] });
 const arr = useRef([]);
 const [ind, setind] = useState(0);
 const [main, setMain] = useState(books.length);
 const [main2, setMain2] = useLocal("gsm", books2.length);
 const [main3, setMain3] = useLocal("gpsm", "notdone");
 const [playList, dispatch] = useLocalr("playlist", reducer, []);
 const [bookMark, dispatch2] = useLocalr("bookmarks", reducer2, []);
 const [song, setSong] = useLocal("song", { name: "", path: "", fold: "" });
 const [tsize, setTize] = useLocal("tsize", 16);
 const [clr, setClr] = useLocal("color", "");
 const [font, setFont] = useLocal("fonttype", "");
 const [file, setFile] = useState(Media.create(song.path));
 const [cposition, setCposition] = useLocal("currentp", 0);
 const [ppb, setPpb] = useState(false);
 const [prog, setProg] = useLocal("prog2", []);
 const [view, setView] = useLocal("view", "1");

 if ("prog" in localStorage) {
  localStorage.removeItem("iskcon");
  localStorage.removeItem("tiskcon");
  localStorage.removeItem("piskcon");
  localStorage.removeItem("book");
  localStorage.removeItem("prog");
 }

 async function setIte(key, val) {
  await Storage.set({
   key: key,
   value: val,
  });
 }

 async function getItem(key) {
  const valu = await Storage.get({ key: key });

  return valu.value;
 }

 useEffect(() => {
  if (song) setFile(Media.create(song.path));
 }, [song]);

 useEffect(() => {
  var _lsTotal = 0,
   _xLen,
   _x;
  for (_x in localStorage) {
   if (!localStorage.hasOwnProperty(_x)) {
    continue;
   }
   _xLen = (localStorage[_x].length + _x.length) * 2;
   _lsTotal += _xLen;
   console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
  }
  console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
 }, []);

 useEffect(() => {
  if (!prog.includes("iskcon")) {
   fetch("https://quiet-peak-15233.herokuapp.com/files/" + "Vaishnava-song-book")
    .then((res) => {
     //console.log(res);
     return res.text();
    })
    .then((text) => {
     setIskcon((prev) => {
      let dum = { ...prev };
      dum.scontent = text;
      return dum;
     });

     setProg((prev) => {
      return [...prev, "iskcon"];
     });
    });
  }
 }, []);

 useEffect(() => {
  if (iskcon.songs.length === 0) {
   let eindex2 = iskcon.scontent.indexOf("DONE2");

   let index2 = iskcon.scontent.indexOf("Index2");

   let fun2 = iskcon.scontent.slice(index2, eindex2);

   let vtext2 = fun2.split(/\r\n|\n/);
   let dvtext2 = [];
   for (let j = 1; j < vtext2.length; j++) {
    dvtext2.push(vtext2[j].slice(0, vtext2[j].indexOf(".")));
   }

   let eindex = iskcon.scontent.indexOf("Done");

   let index = iskcon.scontent.indexOf("INDEX");

   let fun = iskcon.scontent.slice(index, eindex);

   let vtext = fun.split(/\r\n|\n/);

   let etext = [];
   let text = iskcon.scontent.slice(eindex);
   for (let i in vtext) {
    let j = vtext[i].indexOf(",");

    let dum = "";

    for (let k = 0; k < j; k++) {
     dum += vtext[i][k];
    }

    let ind1 = eindex + text.indexOf(dum);
    let ind3 = text.slice(text.indexOf(dum), text.indexOf("(1)", text.indexOf(dum)));
    let ind3t = ind3.split(/\r\n|\n/);
    let author = "";
    let offical = "";

    ind3t.forEach((ele) => {
     if (ele.indexOf("Author") !== -1) {
      author = ele.slice(ele.indexOf("Author") + 8, ele.length);
     }
     if (ele.indexOf("Official Name") !== -1) {
      offical = ele.slice(ele.indexOf("Official Name") + 15, ele.length);
     }
    });

    let ind2 = eindex + text.indexOf("Song Name", ind1 - eindex);

    if (j !== -1) {
     let p = Number(i) + 1;

     let links = [];
     let k = 0;
     while (k !== -1) {
      k = vtext[p].indexOf("link");

      if (k !== -1) {
       let q = vtext[p].indexOf("http");

       if (q !== -1) {
        let linkname = "";
        let linkaddress = "";

        for (let x = k + 5; x < q - 1; x++) {
         linkname += vtext[p][x];
        }
        for (let y = q; y < vtext[p].length; y++) {
         linkaddress += vtext[p][y];
        }
        links.push({ linkname: linkname, linkaddress: linkaddress });
       }
      }
      p++;
     }

     let b = vtext[p - 1].indexOf("book");
     let book = b !== 1 ? vtext[p - 1].slice(5) : "";

     etext.push({ name: dum, sindex: ind1, lindex: ind2 + 9, state: true, link: links, author: author, offical: offical, book: book, dflink: 0 });
    }
   }

   setIskcon((prev) => {
    let dum = { ...prev };
    dum.songs = etext;
    dum.author = dvtext2;
    return dum;
   });
  }
 }, [iskcon.scontent]);

 useEffect(() => {
  if (!prog.includes("vswd")) {
   fetch("https://quiet-peak-15233.herokuapp.com/files/" + "vswd")
    .then((res) => {
     //console.log(res);
     return res.text();
    })
    .then((text) => {
     setSearchBook(text);

     setProg((prev) => {
      return [...prev, "vswd"];
     });
    });
  }
 }, []);

 useEffect(() => {
  if (!prog.includes("piskcon")) {
   fetch("https://quiet-peak-15233.herokuapp.com/files/" + "SPM")
    .then((res) => {
     return res.text();
    })
    .then((text) => {
     setpiskcon((prev) => {
      let dum = { ...prev };
      dum.scontent = text;
      return dum;
     });

     setProg((prev) => {
      return [...prev, "piskcon"];
     });
    });
  }
 }, []);

 useEffect(() => {
  if (piskcon.songs.length === 0) {
   let eindex = piskcon.scontent.indexOf("Done");

   let index = piskcon.scontent.indexOf("INDEX");

   let fun = piskcon.scontent.slice(index, eindex);

   let vtext = fun.split(/\r\n|\n/);

   let etext = [];
   let text = piskcon.scontent.slice(eindex);

   for (let i = 1; i < vtext.length - 1; i = i + 2) {
    let dum = vtext[i];
    let link = vtext[i + 1];
    let edum = vtext[i + 2];
    let k = 0,
     j = dum.length;
    for (let i in dum) {
     if (dum[i] === " ") k++;
     else break;
    }

    for (let i in dum) {
     if (dum[dum.length - 1 - i] === " ") j--;
     else break;
    }

    dum = dum.slice(k, j);
    k = 0;
    j = link.length;
    for (let i in link) {
     if (link[i] === " ") k++;
     else break;
    }

    for (let i in dum) {
     if (link[link.length - 1 - i] === " ") j--;
     else break;
    }
    link = link.slice(k, j);
    k = 0;
    j = edum.length;
    for (let i in edum) {
     if (edum[i] === " ") k++;
     else break;
    }

    for (let i in edum) {
     if (edum[edum.length - 1 - i] === " ") j--;
     else break;
    }
    edum = edum.slice(k, j);

    let ind1 = eindex + text.indexOf(dum);
    let ind3 = eindex + text.indexOf(edum);

    let ind2 = i === vtext.length - 3 ? piskcon.scontent.length : ind3;

    etext.push({ name: dum, sindex: ind1, lindex: ind2 + 9, link: link, offline: false });
   }

   setpiskcon((prev) => {
    let dum = { ...prev };
    dum.songs = etext;
    return dum;
   });
  }
 }, [piskcon.scontent]);

 useEffect(() => {
  for (let i in books) {
   if (!prog.includes(books[i])) {
    fetch("https://quiet-peak-15233.herokuapp.com/files/" + books[i])
     .then((res) => {
      //console.log(res);
      return res.text();
     })
     .then((text) => {
      setContent((prev) => {
       return [...prev, { name: books[i], inside: text, chap: [], song: [] }];
      });

      setProg((prev) => {
       return [...prev, books[i]];
      });
     });
   }
  }
 }, []);

 useEffect(() => {
  if (content.length === main) {
   setMain(0);
  }
 }, [content.length]);

 useEffect(() => {
  for (let ia in content) {
   if (content[ia].chap.length === 0) {
    let sarr = [];
    let sname = -4;
    let ename = 0;
    while (sname !== -1) {
     sname = content[ia].inside.indexOf("Part", sname + 4);

     ename = content[ia].inside.indexOf("Part", sname + 4);
     if (sname !== -1) {
      let pname = content[ia].inside.indexOf("Song", sname);
      let title = content[ia].inside.slice(sname + 7, pname).split(/\r\n|\n/);
      if (ename !== -1) {
       sarr.push(
        //rahul.slice(sname,sname+7)
        { name: title[0], sindex: sname, eindex: ename, song: [] }
       );
      } else {
       sarr.push({ name: title[0], sindex: sname, eindex: content[ia].inside.length, song: [] });
      }
     }
    }

    setContent((prev) => {
     let dum = [...prev];
     dum[ia].chap = [...sarr];
     return dum;
    });
   }
  }
 }, [content.length]);

 useEffect(() => {
  for (let ia in content) {
   // console.log(content);

   if (content[ia].chap.length === 0) {
    if (content[ia].song.length === 0) {
     //console.log(content[ia].name,content[ia].chap[ai].eindex,content[ia].chap[ai].sindex);
     let fun = content[ia].inside;
     let sarr = [];
     let sname = -4;
     let dp = 1;
     while (sname !== -1) {
      sname = fun.indexOf("Song", sname + 4);

      if (sname !== -1) {
       let t1name = fun.indexOf("Text", sname);
       let t2name = fun.indexOf("Text", t1name + 5) > -1 ? fun.indexOf("Text", t1name + 5) : fun.indexOf("Song", t1name + 5);

       let title = fun.slice(t1name, t2name);
       let dtitle = title.split(/\r\n|\n/);

       let dk = 0;
       while (dtitle[dk].length < 15) {
        dk++;
       }

       if (dtitle[dk].indexOf("Text 1") > -1) dtitle[dk] = dtitle[dk].slice(6);
       dtitle[dk] = dtitle[dk].replace(/,/g, "");
       dtitle[dk] = dtitle[dk].replace(/-/g, " ");
       let drtitle = "";
       let sli = 0;
       let don = false;
       for (let i in dtitle[dk]) {
        if (!don) {
         if (dtitle[dk][sli] === " " || dtitle[dk][sli] === "'" || dtitle[dk][sli] === '"') sli++;
         else if (dtitle[dk][sli] !== " ") {
          drtitle = drtitle.concat(dtitle[dk][sli].toUpperCase());
          don = true;
         }
        } else {
         if (dtitle[dk][i - 1] === " ") drtitle = drtitle.concat(dtitle[dk][i].toUpperCase());
         else drtitle = drtitle.concat(dtitle[dk][i]);
        }
       }

       let duptitle = fun.slice(sname, t1name);
       if (duptitle.indexOf("_") !== -1) {
        let duptitled = duptitle.slice(duptitle.indexOf("_") + 1);
        let duptil = duptitled.split(/\r\n|\n/);
        drtitle = duptil[0];
       }

       sarr.push(
        //rahul.slice(sname,sname+7)
        { name: dp + ". " + drtitle, index: sname }
       );
      }
      dp++;
     }

     setContent((prev) => {
      let dum = [...prev];
      dum[ia].song = [...sarr];
      return dum;
     });
    }
   }

   for (let ai in content[ia].chap) {
    if (content[ia].chap[ai].song.length === 0) {
     //console.log(content[ia].name,content[ia].chap[ai].eindex,content[ia].chap[ai].sindex);
     let fun = content[ia].inside.slice(content[ia].chap[ai].sindex, content[ia].chap[ai].eindex);

     let sarr = [];
     let sname = -4;

     let dp = 1;
     while (sname !== -1) {
      sname = fun.indexOf("Song", sname + 4);

      if (sname !== -1) {
       let t1name = fun.indexOf("Text", sname);
       let t2name = fun.indexOf("Text", t1name + 5) > -1 ? fun.indexOf("Text", t1name + 5) : fun.indexOf("Song", t1name + 5);

       let title = fun.slice(t1name, t2name);
       let dtitle = title.split(/\r\n|\n/);

       let dk = 0;
       while (dtitle[dk].length < 15) {
        dk++;
       }
       dtitle[dk] = dtitle[dk].replace("Text 1", "");
       dtitle[dk] = dtitle[dk].replace("(Refrain)", "");
       dtitle[dk] = dtitle[dk].replace("(refrain)", "");
       dtitle[dk] = dtitle[dk].replace(/,/g, "");
       dtitle[dk] = dtitle[dk].replace(/-/g, " ");
       let drtitle = "";
       let sli = 0;
       let don = false;
       for (let i in dtitle[dk]) {
        if (!don) {
         if (dtitle[dk][sli] === " " || dtitle[dk][sli] === "'" || dtitle[dk][sli] === '"') sli++;
         else if (dtitle[dk][sli] !== " ") {
          drtitle = drtitle.concat(dtitle[dk][sli].toUpperCase());
          don = true;
         }
        } else {
         if (dtitle[dk][i - 1] === " ") drtitle = drtitle.concat(dtitle[dk][i].toUpperCase());
         else drtitle = drtitle.concat(dtitle[dk][i]);
        }
       }

       let duptitle = fun.slice(sname, t1name);
       if (duptitle.indexOf("_") !== -1) {
        let duptitled = duptitle.slice(duptitle.indexOf("_") + 1);
        let duptil = duptitled.split(/\r\n|\n/);
        drtitle = duptil[0];
       }

       sarr.push(
        //rahul.slice(sname,sname+7)
        { name: dp + ". " + drtitle, index: sname + content[ia].chap[ai].sindex }
       );
      }
      dp++;
     }

     setContent((prev) => {
      let dum = [...prev];
      dum[ia].chap[ai].song = [...sarr];
      return dum;
     });
    }
   }
  }
 }, [main]);

 useEffect(() => {
  for (let i in books2) {
   if (!prog.includes(books2[i])) {
    fetch("https://quiet-peak-15233.herokuapp.com/files/" + books2[i])
     .then((res) => {
      //console.log(res);
      return res.text();
     })
     .then((text) => {
      setContent2((prev) => {
       let dum = { ...prev };
       dum.inside = text;
       return dum;
      });

      setProg((prev) => {
       return [...prev, books2[i]];
      });
     });
   }
  }
 }, []);

 useEffect(() => {
  if (content2.chap.length === 0) {
   let sarr = [];
   let sname = -4;
   let ename = 0;
   while (sname !== -1) {
    sname = content2.inside.indexOf("Part", sname + 4);

    ename = content2.inside.indexOf("Part", sname + 4);
    if (sname !== -1) {
     let pname = content2.inside.indexOf("Song", sname);
     let title = content2.inside.slice(sname + 7, pname).split(/\r\n|\n/);
     if (ename !== -1) {
      sarr.push(
       //rahul.slice(sname,sname+7)
       { name: title[0], sindex: sname, eindex: ename, song: [] }
      );
     } else {
      sarr.push({ name: title[0], sindex: sname, eindex: content2.inside.length, song: [] });
     }
    }
   }

   setContent2((prev) => {
    let dum = { ...prev };
    dum.chap = [...sarr];
    return dum;
   });
  }
 }, [content2.inside]);

 useEffect(() => {
  // console.log(content2);

  for (let ai in content2.chap) {
   if (content2.chap[ai].song.length === 0) {
    //console.log(content2[ia].name,content2[ia].chap[ai].eindex,content2[ia].chap[ai].sindex);
    let fun = content2.inside.slice(content2.chap[ai].sindex, content2.chap[ai].eindex);

    let sarr = [];
    let sname = -4;

    let dp = 1;
    while (sname !== -1) {
     sname = fun.indexOf("Song", sname + 4);

     if (sname !== -1) {
      let t1name = fun.indexOf("Text", sname);
      let t2name = fun.indexOf("Text", t1name + 5) > -1 ? fun.indexOf("Text", t1name + 5) : fun.indexOf("Song", t1name + 5);

      let title = fun.slice(t1name, t2name);
      let dtitle = title.split(/\r\n|\n/);

      let dk = 0;
      while (dtitle[dk].length < 15) {
       dk++;
      }
      dtitle[dk] = dtitle[dk].replace("Text 1", "");
      dtitle[dk] = dtitle[dk].replace("(Refrain)", "");
      dtitle[dk] = dtitle[dk].replace("(refrain)", "");
      dtitle[dk] = dtitle[dk].replace(/,/g, "");
      dtitle[dk] = dtitle[dk].replace(/-/g, " ");
      let drtitle = "";
      let sli = 0;
      let don = false;
      for (let i in dtitle[dk]) {
       if (!don) {
        if (dtitle[dk][sli] === " " || dtitle[dk][sli] === "'" || dtitle[dk][sli] === '"') sli++;
        else if (dtitle[dk][sli] !== " ") {
         drtitle = drtitle.concat(dtitle[dk][sli].toUpperCase());
         don = true;
        }
       } else {
        if (dtitle[dk][i - 1] === " ") drtitle = drtitle.concat(dtitle[dk][i].toUpperCase());
        else drtitle = drtitle.concat(dtitle[dk][i]);
       }
      }

      let duptitle = fun.slice(sname, t1name);
      if (duptitle.indexOf("_") !== -1) {
       let duptitled = duptitle.slice(duptitle.indexOf("_") + 1);
       let duptil = duptitled.split(/\r\n|\n/);
       drtitle = duptil[0];
      }

      sarr.push(
       //rahul.slice(sname,sname+7)
       { name: dp + ". " + drtitle, index: sname + content2.chap[ai].sindex }
      );
     }
     dp++;
    }

    setContent2((prev) => {
     let dum = { ...prev };
     dum.chap[ai].song = [...sarr];
     return dum;
    });
   }

   setMain2(content2.chap.length);
  }
 }, [content2.chap.length]);

 useEffect(() => {
  console.log(main2, main3);
  if (main3 !== "done") {
   console.log(main2);

   setIte("govardhan", JSON.stringify(content2));
   if (main2 === 12) setMain3("done");
  }
 }, [main2]);

 // console.log(content);

 return (
  <BookContent.Provider value={content}>
   <IskconContent.Provider value={[iskcon, setIskcon]}>
    <SearchBook.Provider value={searchBook}>
     <Scroll.Provider value={arr}>
      <Index.Provider value={[ind, setind]}>
       <Playlist.Provider value={[playList, dispatch]}>
        <Mediap.Provider value={[file, setFile]}>
         <Medias.Provider value={[ppb, setPpb]}>
          <Mediasn.Provider value={[song, setSong]}>
           <Mediat.Provider value={[cposition, setCposition]}>
            <Dplay.Provider value={[dplaylist, setDplaylist]}>
             <BookMark.Provider value={[bookMark, dispatch2]}>
              <Dbookmark.Provider value={[dbookmark, setDbookmark]}>
               <SPContent.Provider value={[piskcon, setpiskcon]}>
                <Prog.Provider value={prog}>
                 <Tsize.Provider value={[tsize, setTize]}>
                  <View.Provider value={[view, setView]}>
                   <Colour.Provider value={[clr, setClr]}>
                    <BookContent2.Provider value={content2}>
                     <FontType.Provider value={[font, setFont]}>{children}</FontType.Provider>
                    </BookContent2.Provider>
                   </Colour.Provider>
                  </View.Provider>
                 </Tsize.Provider>
                </Prog.Provider>
               </SPContent.Provider>
              </Dbookmark.Provider>
             </BookMark.Provider>
            </Dplay.Provider>
           </Mediat.Provider>
          </Mediasn.Provider>
         </Medias.Provider>
        </Mediap.Provider>
       </Playlist.Provider>
      </Index.Provider>
     </Scroll.Provider>
    </SearchBook.Provider>
   </IskconContent.Provider>
  </BookContent.Provider>
 );
}
