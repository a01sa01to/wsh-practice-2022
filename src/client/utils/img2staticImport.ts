import type { StaticImport } from "next/dist/shared/lib/get-img-props";

import Player01 from "../assets/players/001.jpg";
import Player02 from "../assets/players/002.jpg";
import Player03 from "../assets/players/003.jpg";
import Player04 from "../assets/players/004.jpg";
import Player05 from "../assets/players/005.jpg";
import Player06 from "../assets/players/006.jpg";
import Player07 from "../assets/players/007.jpg";
import Player08 from "../assets/players/008.jpg";
import Player09 from "../assets/players/009.jpg";
import Player10 from "../assets/players/010.jpg";
import Player11 from "../assets/players/011.jpg";
import Player12 from "../assets/players/012.jpg";
import Player13 from "../assets/players/013.jpg";
import Player14 from "../assets/players/014.jpg";
import Player15 from "../assets/players/015.jpg";
import Player16 from "../assets/players/016.jpg";
import Player17 from "../assets/players/017.jpg";
import Player18 from "../assets/players/018.jpg";
import Player19 from "../assets/players/019.jpg";
import Player20 from "../assets/players/020.jpg";
import Race01 from "../assets/races/001.jpg";
import Race02 from "../assets/races/002.jpg";
import Race03 from "../assets/races/003.jpg";
import Race04 from "../assets/races/004.jpg";
import Race05 from "../assets/races/005.jpg";
import Race06 from "../assets/races/006.jpg";
import Race07 from "../assets/races/007.jpg";
import Race08 from "../assets/races/008.jpg";
import Race09 from "../assets/races/009.jpg";
import Race10 from "../assets/races/010.jpg";
import Race11 from "../assets/races/011.jpg";
import Race12 from "../assets/races/012.jpg";
import Race13 from "../assets/races/013.jpg";
import Race14 from "../assets/races/014.jpg";
import Race15 from "../assets/races/015.jpg";
import Race16 from "../assets/races/016.jpg";
import Race17 from "../assets/races/017.jpg";
import Race18 from "../assets/races/018.jpg";
import Race19 from "../assets/races/019.jpg";
import Race20 from "../assets/races/020.jpg";

export default function img2staticImport(path: string): StaticImport {
  const mapping = {
    "/assets/images/players/001.jpg": Player01,
    "/assets/images/players/002.jpg": Player02,
    "/assets/images/players/003.jpg": Player03,
    "/assets/images/players/004.jpg": Player04,
    "/assets/images/players/005.jpg": Player05,
    "/assets/images/players/006.jpg": Player06,
    "/assets/images/players/007.jpg": Player07,
    "/assets/images/players/008.jpg": Player08,
    "/assets/images/players/009.jpg": Player09,
    "/assets/images/players/010.jpg": Player10,
    "/assets/images/players/011.jpg": Player11,
    "/assets/images/players/012.jpg": Player12,
    "/assets/images/players/013.jpg": Player13,
    "/assets/images/players/014.jpg": Player14,
    "/assets/images/players/015.jpg": Player15,
    "/assets/images/players/016.jpg": Player16,
    "/assets/images/players/017.jpg": Player17,
    "/assets/images/players/018.jpg": Player18,
    "/assets/images/players/019.jpg": Player19,
    "/assets/images/players/020.jpg": Player20,

    "/assets/images/races/001.jpg": Race01,
    "/assets/images/races/002.jpg": Race02,
    "/assets/images/races/003.jpg": Race03,
    "/assets/images/races/004.jpg": Race04,
    "/assets/images/races/005.jpg": Race05,
    "/assets/images/races/006.jpg": Race06,
    "/assets/images/races/007.jpg": Race07,
    "/assets/images/races/008.jpg": Race08,
    "/assets/images/races/009.jpg": Race09,
    "/assets/images/races/010.jpg": Race10,
    "/assets/images/races/011.jpg": Race11,
    "/assets/images/races/012.jpg": Race12,
    "/assets/images/races/013.jpg": Race13,
    "/assets/images/races/014.jpg": Race14,
    "/assets/images/races/015.jpg": Race15,
    "/assets/images/races/016.jpg": Race16,
    "/assets/images/races/017.jpg": Race17,
    "/assets/images/races/018.jpg": Race18,
    "/assets/images/races/019.jpg": Race19,
    "/assets/images/races/020.jpg": Race20,
  };

  return mapping[path];
}
