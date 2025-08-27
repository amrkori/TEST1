import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, SkipBack, SkipForward, Shuffle, Search, Volume2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const MusicPlayer: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShuffled, setIsShuffled] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    {
      "title": "01._Omry_Maak",
      "artist": "Unknown",
      "duration": "5:30",
      "src": "/songs/01._Omry_Maak.mp3"
    },
    {
      "title": "01.A'al Gany Baad Youmin",
      "artist": "Unknown",
      "duration": "7:45",
      "src": "/songs/01.A'al Gany Baad Youmin.mp3"
    },
    {
      "title": "01.Meen_Momken",
      "artist": "Unknown",
      "duration": "4:27",
      "src": "/songs/01.Meen_Momken.mp3"
    },
    {
      "title": "_Ewediny",
      "artist": "01_",
      "duration": "5:43",
      "src": "/songs/01_-_Ewediny.mp3"
    },
    {
      "title": "01_Banadeek_Taala",
      "artist": "Unknown",
      "duration": "3:15",
      "src": "/songs/01_Banadeek_Taala.mp3"
    },
    {
      "title": "02.Aktar_Wahed",
      "artist": "Unknown",
      "duration": "4:31",
      "src": "/songs/02.Aktar_Wahed.mp3"
    },
    {
      "title": "02.Bahibak",
      "artist": "Unknown",
      "duration": "4:07",
      "src": "/songs/02.Bahibak.mp3"
    },
    {
      "title": "02.Tamally_Maak",
      "artist": "Unknown",
      "duration": "4:31",
      "src": "/songs/02.Tamally_Maak.mp3"
    },
    {
      "title": "03.Ana.Aysha.Hala",
      "artist": "Unknown",
      "duration": "4:28",
      "src": "/songs/03.Ana.Aysha.Hala.mp3"
    },
    {
      "title": "03.At7ada El Aalam",
      "artist": "Unknown",
      "duration": "4:57",
      "src": "/songs/03.At7ada El Aalam.mp3"
    },
    {
      "title": "03_Andy_Suwal",
      "artist": "Unknown",
      "duration": "3:38",
      "src": "/songs/03_Andy_Suwal.mp3"
    },
    {
      "title": "Siilawy",
      "artist": "3alshank",
      "duration": "3:07",
      "src": "/songs/3alshank-Siilawy-MaTb3aa.Com.mp3"
    },
    {
      "title": "04.Allah_Ala_Hobak",
      "artist": "Unknown",
      "duration": "3:41",
      "src": "/songs/04.Allah_Ala_Hobak.mp3"
    },
    {
      "title": "04.Dayman_Maaak",
      "artist": "Unknown",
      "duration": "4:57",
      "src": "/songs/04.Dayman_Maaak.mp3"
    },
    {
      "title": "04.Haga_Mestakhabeya",
      "artist": "Unknown",
      "duration": "4:47",
      "src": "/songs/04.Haga_Mestakhabeya.mp3"
    },
    {
      "title": "04.Kelma",
      "artist": "Unknown",
      "duration": "4:08",
      "src": "/songs/04.Kelma.mp3"
    },
    {
      "title": "04.Nseet_Elnass",
      "artist": "Unknown",
      "duration": "3:22",
      "src": "/songs/04.Nseet_Elnass.mp3"
    },
    {
      "title": "_Esmy",
      "artist": "04_",
      "duration": "7:11",
      "src": "/songs/04_-_Esmy.mp3"
    },
    {
      "title": "_Maak_Alby",
      "artist": "04_",
      "duration": "3:18",
      "src": "/songs/04_-_Maak_Alby.mp3"
    },
    {
      "title": "_Ya_Layali",
      "artist": "04_",
      "duration": "5:00",
      "src": "/songs/04_-_Ya_Layali.mp3"
    },
    {
      "title": "05.W_Ahlam_Leeh",
      "artist": "Unknown",
      "duration": "4:57",
      "src": "/songs/05.W_Ahlam_Leeh.mp3"
    },
    {
      "title": "06._Lessa_Fiha_Kalam",
      "artist": "Unknown",
      "duration": "4:50",
      "src": "/songs/06._Lessa_Fiha_Kalam.mp3"
    },
    {
      "title": "06.Bagheer_Aleeha (1)",
      "artist": "Unknown",
      "duration": "4:39",
      "src": "/songs/06.Bagheer_Aleeha (1).mp3"
    },
    {
      "title": "06.Bagheer_Aleeha",
      "artist": "Unknown",
      "duration": "4:39",
      "src": "/songs/06.Bagheer_Aleeha.mp3"
    },
    {
      "title": "06.Ghaly_Nghmaty.Com",
      "artist": "Unknown",
      "duration": "5:01",
      "src": "/songs/06.Ghaly_Nghmaty.Com.mp3"
    },
    {
      "title": "06.Helwa_El_Ayam",
      "artist": "Unknown",
      "duration": "3:49",
      "src": "/songs/06.Helwa_El_Ayam.mp3"
    },
    {
      "title": "06.Seta_El_Sobah",
      "artist": "Unknown",
      "duration": "4:26",
      "src": "/songs/06.Seta_El_Sobah.mp3"
    },
    {
      "title": "_Elrak_3l_Neia",
      "artist": "06_",
      "duration": "4:19",
      "src": "/songs/06_-_Elrak_3l_Neia.mp3"
    },
    {
      "title": "_Ayeshni_Aktar",
      "artist": "06",
      "duration": "4:47",
      "src": "/songs/06-_Ayeshni_Aktar.mp3"
    },
    {
      "title": "07._Kalam_Eneih",
      "artist": "Unknown",
      "duration": "3:55",
      "src": "/songs/07._Kalam_Eneih.mp3"
    },
    {
      "title": "07.Khabyni",
      "artist": "Unknown",
      "duration": "3:57",
      "src": "/songs/07.Khabyni.mp3"
    },
    {
      "title": "07.Lama_El_Nasim",
      "artist": "Unknown",
      "duration": "5:39",
      "src": "/songs/07.Lama_El_Nasim.mp3"
    },
    {
      "title": "07.Tameny",
      "artist": "Unknown",
      "duration": "2:50",
      "src": "/songs/07.Tameny.mp3"
    },
    {
      "title": "Shams (1)",
      "artist": "07.Zay_El",
      "duration": "4:29",
      "src": "/songs/07.Zay_El-Shams (1).mp3"
    },
    {
      "title": "Shams",
      "artist": "07.Zay_El",
      "duration": "4:29",
      "src": "/songs/07.Zay_El-Shams.mp3"
    },
    {
      "title": "07_Khalina_Lewahdina",
      "artist": "Unknown",
      "duration": "5:19",
      "src": "/songs/07_Khalina_Lewahdina.mp3"
    },
    {
      "title": "08.Allemny_Hawak",
      "artist": "Unknown",
      "duration": "3:20",
      "src": "/songs/08.Allemny_Hawak.mp3"
    },
    {
      "title": "08.Sadakny_Khalas",
      "artist": "Unknown",
      "duration": "3:51",
      "src": "/songs/08.Sadakny_Khalas.mp3"
    },
    {
      "title": "08.We_Fehemt_Einak (1)",
      "artist": "Unknown",
      "duration": "3:41",
      "src": "/songs/08.We_Fehemt_Einak (1).mp3"
    },
    {
      "title": "08.We_Fehemt_Einak",
      "artist": "Unknown",
      "duration": "3:41",
      "src": "/songs/08.We_Fehemt_Einak.mp3"
    },
    {
      "title": "09.Y5lek_Leya",
      "artist": "Unknown",
      "duration": "4:07",
      "src": "/songs/09.Y5lek_Leya.mp3"
    },
    {
      "title": "_Qesset_Hob",
      "artist": "09_",
      "duration": "3:33",
      "src": "/songs/09_-_Qesset_Hob.mp3"
    },
    {
      "title": "09_Youm_Matbelna",
      "artist": "Unknown",
      "duration": "3:25",
      "src": "/songs/09_Youm_Matbelna.mp3"
    },
    {
      "title": "10.Aseebak_Laa",
      "artist": "Unknown",
      "duration": "3:38",
      "src": "/songs/10.Aseebak_Laa.mp3"
    },
    {
      "title": "10.Habeet",
      "artist": "Unknown",
      "duration": "4:19",
      "src": "/songs/10.Habeet.mp3"
    },
    {
      "title": "10.Khalek Be Alby",
      "artist": "Unknown",
      "duration": "5:10",
      "src": "/songs/10.Khalek Be Alby.mp3"
    },
    {
      "title": "10.Khalik_Maaaya",
      "artist": "Unknown",
      "duration": "3:54",
      "src": "/songs/10.Khalik_Maaaya.mp3"
    },
    {
      "title": "_Ma3_El_Ayam",
      "artist": "10_",
      "duration": "3:56",
      "src": "/songs/10_-_Ma3_El_Ayam.mp3"
    },
    {
      "title": "10_Aghla_Min_Omry",
      "artist": "Unknown",
      "duration": "4:46",
      "src": "/songs/10_Aghla_Min_Omry.mp3"
    },
    {
      "title": "10_Ahla_Haga",
      "artist": "Unknown",
      "duration": "5:46",
      "src": "/songs/10_Ahla_Haga.mp3"
    },
    {
      "title": "11.Mayeswa",
      "artist": "Unknown",
      "duration": "3:24",
      "src": "/songs/11.Mayeswa.mp3"
    },
    {
      "title": "_Koly_Melkak",
      "artist": "11_",
      "duration": "4:50",
      "src": "/songs/11_-_Koly_Melkak.mp3"
    },
    {
      "title": "12._Ahla_Haga_Feeky (1)",
      "artist": "Unknown",
      "duration": "3:41",
      "src": "/songs/12._Ahla_Haga_Feeky (1).mp3"
    },
    {
      "title": "12._Ahla_Haga_Feeky",
      "artist": "Unknown",
      "duration": "3:41",
      "src": "/songs/12._Ahla_Haga_Feeky.mp3"
    },
    {
      "title": "12._Mettamena",
      "artist": "Unknown",
      "duration": "4:54",
      "src": "/songs/12._Mettamena.mp3"
    },
    {
      "title": "13._Bahebo",
      "artist": "Unknown",
      "duration": "3:55",
      "src": "/songs/13._Bahebo.mp3"
    },
    {
      "title": "13._Taali",
      "artist": "Unknown",
      "duration": "3:17",
      "src": "/songs/13._Taali.mp3"
    },
    {
      "title": "13.Khalleeny_Ganbak",
      "artist": "Unknown",
      "duration": "5:17",
      "src": "/songs/13.Khalleeny_Ganbak.mp3"
    },
    {
      "title": "14._Odam_Merayetha",
      "artist": "Unknown",
      "duration": "3:42",
      "src": "/songs/14._Odam_Merayetha.mp3"
    },
    {
      "title": "40Z884Iu",
      "artist": "Unknown",
      "duration": "4:43",
      "src": "/songs/40Z884Iu.mp3"
    },
    {
      "title": "65lJ53jH (1)",
      "artist": "Unknown",
      "duration": "4:34",
      "src": "/songs/65lJ53jH (1).mp3"
    },
    {
      "title": "65lJ53jH",
      "artist": "Unknown",
      "duration": "4:34",
      "src": "/songs/65lJ53jH.mp3"
    },
    {
      "title": "93fo364g",
      "artist": "Unknown",
      "duration": "3:47",
      "src": "/songs/93fo364g.mp3"
    },
    {
      "title": "828B26xq",
      "artist": "Unknown",
      "duration": "3:16",
      "src": "/songs/828B26xq.mp3"
    },
    {
      "title": "Hassan.Alasmar",
      "artist": "Aghla.Mn.3enaya",
      "duration": "5:11",
      "src": "/songs/Aghla.Mn.3enaya-Hassan.Alasmar-MaTb3aa.Com.mp3"
    },
    {
      "title": "Albumaty.Com.Ahmed.Fahmy.Elly.Msbrny",
      "artist": "Unknown",
      "duration": "3:26",
      "src": "/songs/Albumaty.Com.Ahmed.Fahmy.Elly.Msbrny.mp3"
    },
    {
      "title": "Albumaty.Com.Ahmed.Fahmy.Handoos",
      "artist": "Unknown",
      "duration": "3:37",
      "src": "/songs/Albumaty.Com.Ahmed.Fahmy.Handoos.mp3"
    },
    {
      "title": "Albumaty.Com.Amr.Diab.Ayesh.Ma3ak",
      "artist": "Unknown",
      "duration": "3:58",
      "src": "/songs/Albumaty.Com.Amr.Diab.Ayesh.Ma3ak.mp3"
    },
    {
      "title": "Albumaty.Com.Amr.Diab.Tehayark",
      "artist": "Unknown",
      "duration": "3:31",
      "src": "/songs/Albumaty.Com.Amr.Diab.Tehayark.mp3"
    },
    {
      "title": "Albumaty.Com.Amr.Diab.Yahob.Dwbna",
      "artist": "Unknown",
      "duration": "3:24",
      "src": "/songs/Albumaty.Com.Amr.Diab.Yahob.Dwbna.mp3"
    },
    {
      "title": "Albumaty.Com.Asala.60_De2e2a_Hayah",
      "artist": "Unknown",
      "duration": "5:55",
      "src": "/songs/Albumaty.Com.Asala.60_De2e2a_Hayah.mp3"
    },
    {
      "title": "Albumaty.Com.Dalida.7lwa.ya.balady (1)",
      "artist": "Unknown",
      "duration": "3:34",
      "src": "/songs/Albumaty.Com.Dalida.7lwa.ya.balady (1).mp3"
    },
    {
      "title": "Albumaty.Com.Dalida.7lwa.ya.balady",
      "artist": "Unknown",
      "duration": "3:34",
      "src": "/songs/Albumaty.Com.Dalida.7lwa.ya.balady.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.7ob.kol.7ayaty",
      "artist": "Unknown",
      "duration": "3:34",
      "src": "/songs/Albumaty.Com.Elissa.7ob.kol.7ayaty.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.Ajmal.Ihssas",
      "artist": "Unknown",
      "duration": "5:54",
      "src": "/songs/Albumaty.Com.Elissa.Ajmal.Ihssas.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.Ayshalak",
      "artist": "Unknown",
      "duration": "4:38",
      "src": "/songs/Albumaty.Com.Elissa.Ayshalak.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.Betmoun",
      "artist": "Unknown",
      "duration": "4:05",
      "src": "/songs/Albumaty.Com.Elissa.Betmoun.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.Chafouna_Tneyn",
      "artist": "Unknown",
      "duration": "4:23",
      "src": "/songs/Albumaty.Com.Elissa.Chafouna_Tneyn.mp3"
    },
    {
      "title": "Albumaty.Com.Elissa.Kol_Youm_Fi_Omry",
      "artist": "Unknown",
      "duration": "5:23",
      "src": "/songs/Albumaty.Com.Elissa.Kol_Youm_Fi_Omry.mp3"
    },
    {
      "title": "Albumaty.Com.Mahmoud.El.Esseily.7elm.b3eed",
      "artist": "Unknown",
      "duration": "5:20",
      "src": "/songs/Albumaty.Com.Mahmoud.El.Esseily.7elm.b3eed.mp3"
    },
    {
      "title": "Albumaty.Com.Mahmoud.Elessily.Ya.Nas",
      "artist": "Unknown",
      "duration": "3:24",
      "src": "/songs/Albumaty.Com.Mahmoud.Elessily.Ya.Nas.mp3"
    },
    {
      "title": "Albumaty.Com.Saad.Ramadan.Shou.Mahssoudin (1)",
      "artist": "Unknown",
      "duration": "3:20",
      "src": "/songs/Albumaty.Com.Saad.Ramadan.Shou.Mahssoudin (1).mp3"
    },
    {
      "title": "Albumaty.Com.Saad.Ramadan.Shou.Mahssoudin",
      "artist": "Unknown",
      "duration": "3:20",
      "src": "/songs/Albumaty.Com.Saad.Ramadan.Shou.Mahssoudin.mp3"
    },
    {
      "title": "Albumaty.Com.Sherin.Tariqy",
      "artist": "Unknown",
      "duration": "4:26",
      "src": "/songs/Albumaty.Com.Sherin.Tariqy.mp3"
    },
    {
      "title": "Albumaty.Com_abyr_namt_bsraht",
      "artist": "Unknown",
      "duration": "3:18",
      "src": "/songs/Albumaty.Com_abyr_namt_bsraht.mp3"
    },
    {
      "title": "Albumaty.Com_adm_ya_hlw",
      "artist": "Unknown",
      "duration": "3:27",
      "src": "/songs/Albumaty.Com_adm_ya_hlw.mp3"
    },
    {
      "title": "Albumaty.Com_alakhrs__skaba",
      "artist": "Unknown",
      "duration": "3:15",
      "src": "/songs/Albumaty.Com_alakhrs__skaba.mp3"
    },
    {
      "title": "Albumaty.Com_Amr_Diab_Ray2ah",
      "artist": "Unknown",
      "duration": "4:06",
      "src": "/songs/Albumaty.Com_Amr_Diab_Ray2ah.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_abtdyna",
      "artist": "Unknown",
      "duration": "3:53",
      "src": "/songs/Albumaty.Com_amrw_dyab_abtdyna.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_baba",
      "artist": "Unknown",
      "duration": "3:18",
      "src": "/songs/Albumaty.Com_amrw_dyab_baba.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_btmn_alyk",
      "artist": "Unknown",
      "duration": "4:02",
      "src": "/songs/Albumaty.Com_amrw_dyab_btmn_alyk.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_hbیbty_mlak",
      "artist": "Unknown",
      "duration": "4:15",
      "src": "/songs/Albumaty.Com_amrw_dyab_hbیbty_mlak.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_khtfwny",
      "artist": "Unknown",
      "duration": "4:20",
      "src": "/songs/Albumaty.Com_amrw_dyab_khtfwny.mp3"
    },
    {
      "title": "Albumaty.Com_amrw_dyab_ma_tklksh",
      "artist": "Unknown",
      "duration": "4:14",
      "src": "/songs/Albumaty.Com_amrw_dyab_ma_tklksh.mp3"
    },
    {
      "title": "Albumaty.Com_asalt_fwk",
      "artist": "Unknown",
      "duration": "3:08",
      "src": "/songs/Albumaty.Com_asalt_fwk.mp3"
    },
    {
      "title": "_mn_fylm_alhwi_sltan",
      "artist": "Albumaty.Com_bhaa_sltan_ana_mn_ghyrk_",
      "duration": "3:41",
      "src": "/songs/Albumaty.Com_bhaa_sltan_ana_mn_ghyrk_-_mn_fylm_alhwi_sltan.mp3"
    },
    {
      "title": "_ealan_enrshya",
      "artist": "Albumaty.Com_bhaa_sltan_ana_msh_aayz_ghyrk_",
      "duration": "3:27",
      "src": "/songs/Albumaty.Com_bhaa_sltan_ana_msh_aayz_ghyrk_-_ealan_enrshya.mp3"
    },
    {
      "title": "Albumaty.Com_Elissa_Ayami_Biek",
      "artist": "Unknown",
      "duration": "4:40",
      "src": "/songs/Albumaty.Com_Elissa_Ayami_Biek.mp3"
    },
    {
      "title": "Albumaty.Com_hsyn_algsmy_ana_walkmr",
      "artist": "Unknown",
      "duration": "4:33",
      "src": "/songs/Albumaty.Com_hsyn_algsmy_ana_walkmr.mp3"
    },
    {
      "title": "Albumaty.Com_ltyft_ya_lyaly",
      "artist": "Unknown",
      "duration": "4:20",
      "src": "/songs/Albumaty.Com_ltyft_ya_lyaly.mp3"
    },
    {
      "title": "Albumaty.Com_Mahmoud_El_Esseily_Ganna_Tekfeina",
      "artist": "Unknown",
      "duration": "4:16",
      "src": "/songs/Albumaty.Com_Mahmoud_El_Esseily_Ganna_Tekfeina.mp3"
    },
    {
      "title": "Albumaty.Com_mdht_salh_da_hb",
      "artist": "Unknown",
      "duration": "2:58",
      "src": "/songs/Albumaty.Com_mdht_salh_da_hb.mp3"
    },
    {
      "title": "_mn_mslsl_hgmt_mrtdt",
      "artist": "Albumaty.Com_mdht_salh_kl_klam_alhb_",
      "duration": "3:14",
      "src": "/songs/Albumaty.Com_mdht_salh_kl_klam_alhb_-_mn_mslsl_hgmt_mrtdt.mp3"
    },
    {
      "title": "Albumaty.Com_mhmwd_alasyly_dlmt_dlmt",
      "artist": "Unknown",
      "duration": "3:38",
      "src": "/songs/Albumaty.Com_mhmwd_alasyly_dlmt_dlmt.mp3"
    },
    {
      "title": "_mn_mslsl_kaml_aladd___",
      "artist": "Albumaty.Com_mhmwd_alasyly_hbyby_wabn_hbyby_",
      "duration": "3:16",
      "src": "/songs/Albumaty.Com_mhmwd_alasyly_hbyby_wabn_hbyby_-_mn_mslsl_kaml_aladd___.mp3"
    },
    {
      "title": "_ealan_wady_dglt_llttwyr_alakary",
      "artist": "Albumaty.Com_mhmwd_alasyly_kl_snt_",
      "duration": "2:26",
      "src": "/songs/Albumaty.Com_mhmwd_alasyly_kl_snt_-_ealan_wady_dglt_llttwyr_alakary.mp3"
    },
    {
      "title": "Albumaty.Com_nasyf_zytwn_balahlam",
      "artist": "Unknown",
      "duration": "2:46",
      "src": "/songs/Albumaty.Com_nasyf_zytwn_balahlam.mp3"
    },
    {
      "title": "Albumaty.Com_ramy_sbri_kl_snt",
      "artist": "Unknown",
      "duration": "3:03",
      "src": "/songs/Albumaty.Com_ramy_sbri_kl_snt.mp3"
    },
    {
      "title": "Albumaty.Com_rda_albhrawi_dk_alhwa_dkh",
      "artist": "Unknown",
      "duration": "4:34",
      "src": "/songs/Albumaty.Com_rda_albhrawi_dk_alhwa_dkh.mp3"
    },
    {
      "title": "Albumaty.Com_shyryn_asl_hyaty",
      "artist": "Unknown",
      "duration": "4:54",
      "src": "/songs/Albumaty.Com_shyryn_asl_hyaty.mp3"
    },
    {
      "title": "Albumaty.Com_Tamer_Ashour_Khalini (1)",
      "artist": "Unknown",
      "duration": "3:16",
      "src": "/songs/Albumaty.Com_Tamer_Ashour_Khalini (1).mp3"
    },
    {
      "title": "Albumaty.Com_Tamer_Ashour_Khalini",
      "artist": "Unknown",
      "duration": "3:16",
      "src": "/songs/Albumaty.Com_Tamer_Ashour_Khalini.mp3"
    },
    {
      "title": "_mn_fylm_bhbk",
      "artist": "Albumaty.Com_tamr_hsni_ant_akhtyar_",
      "duration": "4:06",
      "src": "/songs/Albumaty.Com_tamr_hsni_ant_akhtyar_-_mn_fylm_bhbk.mp3"
    },
    {
      "title": "Albumaty.Com_tww_lyt_hsyny",
      "artist": "Unknown",
      "duration": "3:33",
      "src": "/songs/Albumaty.Com_tww_lyt_hsyny.mp3"
    },
    {
      "title": "Albumaty.Com_tww_lyt_whhkylk_hkawy",
      "artist": "Unknown",
      "duration": "2:21",
      "src": "/songs/Albumaty.Com_tww_lyt_whhkylk_hkawy.mp3"
    },
    {
      "title": "Albumaty.Com_wail_gsar_wla_fy_alahlam",
      "artist": "Unknown",
      "duration": "4:23",
      "src": "/songs/Albumaty.Com_wail_gsar_wla_fy_alahlam.mp3"
    },
    {
      "title": "_ma__lygy_sy",
      "artist": "Albumaty.Com_zyad_zaza_wla_myn_",
      "duration": "3:13",
      "src": "/songs/Albumaty.Com_zyad_zaza_wla_myn_-_ma__lygy_sy.mp3"
    },
    {
      "title": "Rada.Albahrawy",
      "artist": "Ba3d.Elhanane",
      "duration": "4:35",
      "src": "/songs/Ba3d.Elhanane-Rada.Albahrawy-MaTb3aa.Com.mp3"
    },
    {
      "title": "Behom_Kolohom_Albumaty.Com",
      "artist": "Unknown",
      "duration": "4:02",
      "src": "/songs/Behom_Kolohom_Albumaty.Com.mp3"
    },
    {
      "title": "El_shams",
      "artist": "Unknown",
      "duration": "9:31",
      "src": "/songs/El_shams.mp3"
    },
    {
      "title": "Malesh Ba3dak",
      "artist": "Karim Mo7sen.ft.Tamer 7osne",
      "duration": "3:39",
      "src": "/songs/Karim Mo7sen.ft.Tamer 7osne - Malesh Ba3dak.mp3"
    },
    {
      "title": "MaTb3aa.Com",
      "artist": "Mahrgan.Fe.Zenznty",
      "duration": "3:45",
      "src": "/songs/Mahrgan.Fe.Zenznty-MaTb3aa.Com.mp3"
    },
    {
      "title": "MaTb3aa.Com",
      "artist": "Mahrgan.L3baly.F.Dmaghy",
      "duration": "1:33",
      "src": "/songs/Mahrgan.L3baly.F.Dmaghy-MaTb3aa.Com.mp3"
    },
    {
      "title": "AlShami",
      "artist": "Maleket.Gamal.ElKon",
      "duration": "2:50",
      "src": "/songs/Maleket.Gamal.ElKon-AlShami-MaTb3aa.Com.mp3"
    },
    {
      "title": "Marawan.Khory_Baashak.Rouhik",
      "artist": "Unknown",
      "duration": "4:13",
      "src": "/songs/Marawan.Khory_Baashak.Rouhik.mp3"
    },
    {
      "title": "Nghmat.Com_Amr.Diab_lama.2abeltak",
      "artist": "Unknown",
      "duration": "3:52",
      "src": "/songs/Nghmat.Com_Amr.Diab_lama.2abeltak.mp3"
    },
    {
      "title": "muneeb",
      "artist": "ytmp3free.cc_amir",
      "duration": "3:58",
      "src": "/songs/ytmp3free.cc_amir-muneeb-leil-wnahar-youtubemp3free.org.mp3"
    },
    {
      "title": "a3ml",
      "artist": "ytmp3free.cc_mohab",
      "duration": "2:41",
      "src": "/songs/ytmp3free.cc_mohab-a3ml-eh-official-audio-youtubemp3free.org.mp3"
    },
    {
      "title": "بحبك وبغار عاصي الحلاني",
      "artist": "Unknown",
      "duration": "5:55",
      "src": "/songs/بحبك وبغار عاصي الحلاني.mp3"
    },
    {
      "title": "بقولك اي يبشا",
      "artist": "Unknown",
      "duration": "0:05",
      "src": "/songs/بقولك اي يبشا.mp3"
    },
    {
      "title": "لكل عاشق وطن خالد سليم",
      "artist": "Unknown",
      "duration": "3:20",
      "src": "/songs/لكل عاشق وطن خالد سليم.mp3"
    },
    {
      "title": "من اول يوم مصطفي قمر",
      "artist": "Unknown",
      "duration": "3:17",
      "src": "/songs/من اول يوم مصطفي قمر.mp3"
    },
    {
      "title": "دندنها",
      "artist": "نامي",
      "duration": "5:52",
      "src": "/songs/نامي - دندنها.mp3"
    },
    {
      "title": "هقولك كلمه تامر حسني",
      "artist": "Unknown",
      "duration": "3:52",
      "src": "/songs/هقولك كلمه تامر حسني.mp3"
    },
    {
      "title": "يا ملاك عامر منيب",
      "artist": "Unknown",
      "duration": "5:00",
      "src": "/songs/يا ملاك عامر منيب.mp3"
    }
  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectSong = (index: number) => {
    const actualIndex = songs.findIndex(song => song === filteredSongs[index]);
    setCurrentSong(actualIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[actualIndex].src;
      audioRef.current.load();
    }
  };

  const nextSong = () => {
    const nextIndex = isShuffled 
      ? Math.floor(Math.random() * songs.length)
      : (currentSong + 1) % songs.length;
    setCurrentSong(nextIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src;
      audioRef.current.load();
    }
  };

  const prevSong = () => {
    const prevIndex = isShuffled 
      ? Math.floor(Math.random() * songs.length)
      : (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prevIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src;
      audioRef.current.load();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, volume]);

  return (
    <section id="playlist" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Our Playlist
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <p className="text-center text-white/80 mb-8 text-lg">Songs that tell our story</p>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
              />
            </div>

            {/* Current Song Display */}
            <div className="text-center mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-2">{songs[currentSong]?.title || 'No Song Selected'}</h3>
              <p className="text-white/60 mb-4">{songs[currentSong]?.artist || 'Unknown Artist'}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isShuffled ? 'bg-pink-400 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <Shuffle size={20} />
                </button>
                
                <button
                  onClick={prevSong}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
                >
                  <SkipBack size={24} />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </button>
                
                <button
                  onClick={nextSong}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
                >
                  <SkipForward size={24} />
                </button>

                <div className="flex items-center space-x-2">
                  <Volume2 size={20} className="text-white/60" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
            
            {/* Playlist */}
            <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
              {filteredSongs.map((song, index) => {
                const actualIndex = songs.findIndex(s => s === song);
                return (
                  <div
                    key={`${song.src}-${index}`}
                    onClick={() => selectSong(index)}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                      currentSong === actualIndex ? 'bg-white/10 border border-pink-400/30' : 'hover:translate-x-2'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      currentSong === actualIndex ? 'bg-pink-400' : 'bg-white/10'
                    }`}>
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{song.title}</h4>
                      <p className="text-white/60 text-sm truncate">{song.artist}</p>
                    </div>
                    <div className="text-white/40 text-sm mr-4">{song.duration}</div>
                    <Heart size={16} className="text-pink-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
            
            {filteredSongs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/60">No songs found matching your search.</p>
              </div>
            )}
            
            {/* Hidden audio element */}
            <audio 
              ref={audioRef} 
              className="hidden"
              src={songs[currentSong]?.src}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 107, 0.6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 107, 0.8);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default MusicPlayer;