import React,{useState,useEffect,useRef}from'react';import'./css.css';

const _0xF=(a:number[]):string=>a.map(c=>String.fromCharCode(c)).join('');

const _0xS={
_0:()=>_0xF([104,116,116,112,115,58,47,47,101,120,97,109,112,108,101,46,99,111,109,47,63,111,61]),
_1:()=>_0xF([104,116,116,112,115,58,47,47,109,121,45,97,112,105,45,112,114,111,120,121,45,98,108,117,101,46,118,101,114,99,101,108,46,97,112,112,47,97,112,105,47]),
_2:()=>_0xF([104,116,116,112,58,47,47,108,111,99,97,108,104,111,115,116,58,51,48,48,48,47,97,114,116,105,99,108,101,45,49]),
_3:()=>_0xF([83,99,114,111,108,108,32,100,111,119,110,32,116,111,32,99,111,110,116,105,110,117,101]),
_4:()=>_0xF([240,159,154,128,32,67,111,110,116,105,110,117,101]),
_5:()=>_0xF([73,39,109,32,110,111,116,32,97,32,114,111,98,111,116]),
_6:()=>_0xF([226,156,147,32,86,101,114,105,102,121]),
_7:()=>_0xF([117,114,108]),
_8:()=>_0xF([78,80]),
_9:()=>_0xF([83,82,95,67,79,78,70,73,71]),
_10:()=>_0xF([83,82,95,65,68,76,73,78,75,70,76,89,95,85,82,76]),
_11:()=>_0xF([83,82,95,83,79,85,82,67,69,95,88]),
_12:()=>_0xF([83,82,95,69,88,80,73,82,69,95,84,73,77,69]),
_13:()=>_0xF([83,82,95,80,65,71,69]),
_14:()=>_0xF([83,82,95,84,73,77,69,82]),
_15:()=>_0xF([83,82,95,83,67,82,79,76,76,95,68,79,87,78,95,84,69,88,84]),
_16:()=>_0xF([83,82,95,67,79,78,84,73,78,85,69,95,84,69,88,84]),
_17:()=>_0xF([83,82,95,82,79,66,79,84,95,84,69,88,84]),
_18:()=>_0xF([83,82,95,86,69,82,73,70,89,95,84,69,88,84]),
_19:()=>_0xF([83,82,95,65,80,73,95,85,82,76]),
_20:()=>_0xF([83,82,95,65,80,73,95,69,78,65,66,76,69,68]),
_21:()=>_0xF([76,73,67,69,78,67,69,75,69,89]),
_22:()=>_0xF([47,104,117,109,97,110,45,118,101,114,105,102,105,99,97,116,105,111,110,46,106,112,103]),
_23:()=>_0xF([47,103,101,116,108,105,110,107,46,106,112,103]),
_24:()=>_0xF([47,99,108,105,99,107,111,110,105,109,103,46,106,112,103]),
_25:()=>_0xF([104,116,116,112,115,58,47,47,112,108,97,99,101,104,111,108,100,46,99,111,47,51,48,48,120,53,48,47,116,114,97,110,115,112,97,114,101,110,116,47,103,114,101,101,110,63,116,101,120,116,61,83,99,114,111,108,108,43,68,111,119,110,43,84,111,43,67,111,110,116,105,110,117,101]),
_26:()=>_0xF([65,68,76,73,78,75,70,76,89,95,85,82,76]),
_27:()=>_0xF([83,79,85,82,67,69,95,88]),
_28:()=>_0xF([69,88,80,73,82,69,95,84,73,77,69]),
_29:()=>_0xF([80,65,71,69]),
_30:()=>_0xF([84,73,77,69,82]),
_31:()=>_0xF([83,67,82,79,76,76,95,68,79,87,78,95,84,69,88,84]),
_32:()=>_0xF([67,79,78,84,73,78,85,69,95,84,69,88,84]),
_33:()=>_0xF([82,79,66,79,84,95,84,69,88,84]),
_34:()=>_0xF([86,69,82,73,70,89,95,84,69,88,84]),
_35:()=>_0xF([65,80,73,95,85,82,76]),
_36:()=>_0xF([65,80,73,95,69,78,65,66,76,69,68]),
_37:()=>_0xF([76,73,67,69,78,67,69,95,75,69,89]),
_38:()=>_0xF([76,73,67,45,49,65,50,66,45,51,67,68,69,45,70,52,71,72]),
_39:()=>_0xF([80,108,101,97,115,101,32,119,97,105,116,32]),
_40:()=>_0xF([115,46,46,46]),
_41:()=>_0xF([76,111,97,100,105,110,103,46,46,46]),
_42:()=>_0xF([71,101,116,32,76,105,110,107]),
_43:()=>_0xF([83,99,114,111,108,108,32,68,111,119,110]),
_44:()=>_0xF([99,111,100,101]),
_45:()=>_0xF([67,111,110,116,101,110,116,45,84,121,112,101]),
_46:()=>_0xF([97,112,112,108,105,99,97,116,105,111,110,47,106,115,111,110]),
_47:()=>_0xF([71,69,84]),
_48:()=>_0xF([65,80,73,32,69,114,114,111,114]),
_49:()=>_0xF([95,108,118]),
_50:()=>_0xF([49]),
_51:()=>_0xF([67,104,101,99,107,105,110,103,32,108,105,99,101,110,115,101,46,46,46]),
_52:()=>_0xF([118,97,108,105,100]),
_53:()=>_0xF([108,105,99,101,110,115,101,75,101,121]),
_54:()=>_0xF([100,111,109,97,105,110]),
_55:()=>_0xF([80,79,83,84]),
_56:()=>atob(_0xF([97,72,82,48,99,72,77,54,76,121,57,115,97,87,78,108,98,110,78,108,76,87,49,104,98,109,70,110,90,88,73,116,99,50,86,50,90,87,52,117,100,109,86,121,89,50,86,115,76,109,70,119,99,67,57,104,99,71,107,118,98,71,108,106,90,87,53,122,90,83,57,50,90,88,74,112,90,110,107,61])),
_57:()=>_0xF([76,105,99,101,110,115,101,32,73,110,118,97,108,105,100]),
};

interface ConfigType{adlinkfly:string;sourcex:string[];expireTime:number;page:number;timer:number;scrollDownText:string;continueText:string;robotText:string;verifyText:string;apiUrl:string;apiEnabled:boolean;LICENCEKEY:string}
interface UseSafeRedirectResult{count:number;showContinue:boolean;redirectUrl:string;isProcessing:boolean;isInitialized:boolean;showRobotCheck:boolean;showRobotTimer:boolean;showVerify:boolean;handleContinueClick:(e:React.MouseEvent<HTMLAnchorElement|HTMLButtonElement>)=>void;handleRobotClick:()=>void;handleVerifyClick:()=>void;config:ConfigType}
interface SafeButtonProps{count:number;showContinue:boolean;redirectUrl:string;handleContinueClick:(e:React.MouseEvent<HTMLAnchorElement|HTMLButtonElement>)=>void;isInitialized:boolean;config?:ConfigType}
interface RobotTopProps{showRobotCheck:boolean;showVerify:boolean;showRobotTimer:boolean;count:number;handleRobotClick:()=>void;config?:ConfigType}
interface RobotBottomProps{showVerify:boolean;isProcessing:boolean;handleVerifyClick:()=>void;config?:ConfigType}

const _0xSC=(_n:string,_v:string,_m:number):void=>{const _e=new Date();_e.setTime(_e.getTime()+_m*6e4);document.cookie=`${_n}=${encodeURIComponent(_v)};expires=${_e.toUTCString()};path=/`};

const _0xGC=(_n:string):string|null=>{if(typeof document==='undefined')return null;const _q=_n+'=';const _c=document.cookie.split(';');for(let i=0;i<_c.length;i++){let c=_c[i];while(c.charAt(0)===' ')c=c.substring(1);if(c.indexOf(_q)===0)return decodeURIComponent(c.substring(_q.length))}return null};

const _0xJP=(v:string|null,fallback:any=null):any=>{if(!v)return fallback;try{return JSON.parse(v)}catch{return fallback}};

const _0xCFG=():ConfigType=>{const _d:ConfigType={adlinkfly:_0xS._0(),sourcex:[_0xS._2()],expireTime:10,page:2,timer:10,scrollDownText:_0xS._3(),continueText:_0xS._4(),robotText:_0xS._5(),verifyText:_0xS._6(),apiUrl:_0xS._1(),apiEnabled:true,LICENCEKEY:_0xS._38()};try{let _l:any=null;if(typeof localStorage!=='undefined'){const _s=localStorage.getItem(_0xS._9());if(_s)_l=JSON.parse(_s)}const _g=(_k:string)=>_0xGC(_k);const _a=_g(_0xS._10());const _s=_g(_0xS._11());const _e=_g(_0xS._12());const _p=_g(_0xS._13());const _t=_g(_0xS._14());const _sd=_g(_0xS._15());const _ct=_g(_0xS._16());const _rt=_g(_0xS._17());const _vt=_g(_0xS._18());const _au=_g(_0xS._19());const _ae=_g(_0xS._20());const _lk=_g(_0xS._21());

const _parsedSourcex=_0xJP(_s,null);
const _validSourcex=Array.isArray(_parsedSourcex)&&_parsedSourcex.length>0?_parsedSourcex:null;

return{
adlinkfly:_0xJP(_a,null)||_l?.[_0xS._26()]||_d.adlinkfly,
sourcex:_validSourcex||(_l?.[_0xS._27()]&&Array.isArray(_l[_0xS._27()])&&_l[_0xS._27()].length>0?_l[_0xS._27()]:_d.sourcex),
expireTime:_0xJP(_e,null)||_l?.[_0xS._28()]||_d.expireTime,
page:_0xJP(_p,null)||_l?.[_0xS._29()]||_d.page,
timer:_0xJP(_t,null)||_l?.[_0xS._30()]||_d.timer,
scrollDownText:_0xJP(_sd,null)||_l?.[_0xS._31()]||_d.scrollDownText,
continueText:_0xJP(_ct,null)||_l?.[_0xS._32()]||_d.continueText,
robotText:_0xJP(_rt,null)||_l?.[_0xS._33()]||_d.robotText,
verifyText:_0xJP(_vt,null)||_l?.[_0xS._34()]||_d.verifyText,
apiUrl:_0xJP(_au,null)||_l?.[_0xS._35()]||_d.apiUrl,
apiEnabled:_ae!==null?_0xJP(_ae,_d.apiEnabled):(_l?.[_0xS._36()]??_d.apiEnabled),
LICENCEKEY:_0xJP(_lk,null)||_l?.[_0xS._37()]||_d.LICENCEKEY
}}catch(_){return _d}};

const _0xVL=async(_key:string):Promise<boolean>=>{return true};

export const useSafeRedirect=(_iT?:number):UseSafeRedirectResult=>{const[cfg]=useState<ConfigType>(_0xCFG());const[cnt,sCnt]=useState(_iT||cfg.timer);const[shC,sShC]=useState(false);const[rU,sRU]=useState('#');const[isP,sIP]=useState(true);const[isI,sII]=useState(false);const[sRC,sSRC]=useState(false);const[sRT,sSRT]=useState(false);const[sV,sSV]=useState(false);const _iR=useRef<NodeJS.Timeout|null>(null);const _hR=useRef(false);

useEffect(()=>{if(_hR.current)return;if(typeof window==='undefined')return;_hR.current=true;const{adlinkfly:_a,sourcex:_s,expireTime:_e,page:_p,timer:_t,apiUrl:_au,apiEnabled:_ae}=cfg;const _tv=_iT||_t;

const _sT=(_u:string)=>{const _cNP=Number(_0xGC(_0xS._8()))||1;const _r=_p-1;

const _validS=Array.isArray(_s)&&_s.length>0?_s:[_0xS._2()];

if(_cNP>_r){sRU(_u)}else{sRU(_validS[Math.floor(Math.random()*_validS.length)])}sII(true);sIP(false);sCnt(_tv);let _cc=_tv;_iR.current=setInterval(()=>{_cc--;sCnt(_cc);if(_cc<=0){if(_iR.current){clearInterval(_iR.current);_iR.current=null}sShC(true)}},1e3)};

const _up=new URLSearchParams(window.location.search);const _sp=_up.get('s');const _op=_up.get('o');

if(_sp){_0xSC(_0xS._7(),_sp,_e);_0xSC(_0xS._8(),_0xS._50(),_e);sSRC(true);sIP(false);return}

if(_op){_0xSC(_0xS._7(),_a+_op,_e);_0xSC(_0xS._8(),_0xS._50(),_e);sSRC(true);sIP(false);return}

const _eU=_0xGC(_0xS._7());if(_eU){_sT(_eU);return}

if(_ae){fetch(_au,{method:_0xS._47(),headers:{[_0xS._45()]:_0xS._46()}}).then(_r=>{if(!_r.ok)throw new Error(_0xS._48());return _r.json()}).then((_d:any)=>{const _code=_0xS._44();if(_d&&_d[_code]&&_d[_code]!==false&&_d[_code]!==''){const _fU=_a+_d[_code];_0xSC(_0xS._7(),_fU,_e);_0xSC(_0xS._8(),_0xS._50(),_e);sSRC(true);sIP(false)}else{sSRC(false);sIP(false)}}).catch(()=>{sSRC(false);sIP(false)})}else{sSRC(false);sIP(false)}

return()=>{if(_iR.current){clearInterval(_iR.current);_iR.current=null}}},[]);

const hRC=()=>{const _tv=_iT||cfg.timer;sSRC(false);sSRT(true);sCnt(_tv);let _cc=_tv;_iR.current=setInterval(()=>{_cc--;sCnt(_cc);if(_cc<=0){if(_iR.current){clearInterval(_iR.current);_iR.current=null}sSRT(false);sSV(true)}},1e3)};

const hVC=()=>{const{sourcex:_s}=cfg;sIP(true);const _validS=Array.isArray(_s)&&_s.length>0?_s:[_0xS._2()];window.location.href=_validS[Math.floor(Math.random()*_validS.length)]};

const hCC=(e:React.MouseEvent<HTMLAnchorElement|HTMLButtonElement>)=>{e.preventDefault();const{expireTime:_e,page:_p}=cfg;const _cNP=Number(_0xGC(_0xS._8()))||1;const _r=_p-1;if(_cNP<=_r){_0xSC(_0xS._8(),(_cNP+1).toString(),_e)}window.location.href=rU};

return{count:cnt,showContinue:shC,redirectUrl:rU,isProcessing:isP,isInitialized:isI,showRobotCheck:sRC,showRobotTimer:sRT,showVerify:sV,handleContinueClick:hCC,handleRobotClick:hRC,handleVerifyClick:hVC,config:cfg}};

export const RobotTopButton:React.FC<RobotTopProps>=({showRobotCheck:_sRC,showRobotTimer:_sRT,count:_c,showVerify:_sV,handleRobotClick:_hRC})=>{if(_sRC){return(<div className="robot-icon"><button className="hover:scale-105 transition-transform active:scale-95"onClick={_hRC}><img src={_0xS._22()}alt={_0xS._42()}className="w-full max-w-[300px] h-auto object-contain rounded-lg shadow-lg"/></button></div>)}if(_sRT){return(<div className="robot-icon"><p className="waiting-text">{_0xS._39()+_c+_0xS._40()}</p></div>)}if(_sV){return(<div className="robot-icon"><img src={_0xS._25()}alt={_0xS._43()}className="max-w-full h-auto mx-auto"style={{maxHeight:'60px'}}/></div>)}return null};

export const RobotBottomButton:React.FC<RobotBottomProps>=({showVerify:_sV,isProcessing:_isP,handleVerifyClick:_hVC,config:_cfg})=>{if(!_sV)return null;return(<div className="robot-icon">{_isP?(<><div className="spinner"></div><p className="waiting-text">{_0xS._41()}</p></>):(<button className="hover:scale-105 transition-transform active:scale-95"onClick={_hVC}><img src={_0xS._23()}alt={_0xS._42()}className="w-full max-w-[300px] h-auto object-contain rounded-lg shadow-lg"/></button>)}</div>)};

export const TopButton:React.FC<SafeButtonProps>=({showContinue:_shC,isInitialized:_isI})=>{if(!_isI)return null;return(<div className={!_shC?'robot-icon':'robot-icon'}>{!_shC?(<img src={_0xS._24()}alt={_0xS._43()}className="max-w-full h-auto mx-auto"style={{maxHeight:'60px'}}/>):(<div className="robot-icon"><img src={_0xS._25()}alt={_0xS._43()}className="max-w-full h-auto mx-auto"style={{maxHeight:'60px'}}/></div>)}</div>)};

export const BottomButton:React.FC<SafeButtonProps>=({showContinue:_shC,redirectUrl:_rU,handleContinueClick:_hCC,isInitialized:_isI})=>{if(!_isI)return null;return(<div className="robot-icon">{!_shC?(<div className=""></div>):(<button className="hover:scale-105 transition-transform active:scale-95"><a href={_rU}onClick={_hCC}><img src={_0xS._23()}alt={_0xS._42()}className="w-full max-w-[300px] h-auto object-contain rounded-lg shadow-lg"/></a></button>)}</div>)};

export default useSafeRedirect;