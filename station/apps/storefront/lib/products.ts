export type WorknicProduct={slug:string;brand:string;name:string;model:string;price:number;section:"REFILL"|"TOOLS"|"SELECT";pickup:string}
export const products:WorknicProduct[]=[
 {slug:"tajima-lcb-65rb",brand:"TAJIMA",name:"25mm 커터 교체날",model:"LCB-65RB",price:8800,section:"REFILL",pickup:"STATION 수령 대상"},
 {slug:"makita-a-49600",brand:"MAKITA",name:"토션 비트 세트",model:"A-49600",price:9000,section:"REFILL",pickup:"STATION 수령 대상"},
 {slug:"makita-p-72877",brand:"MAKITA",name:"185mm 원형톱날",model:"P-72877",price:8000,section:"REFILL",pickup:"STATION 수령 대상"},
 {slug:"makita-b-57168",brand:"MAKITA",name:"줄자 10m",model:"B-57168",price:27500,section:"TOOLS",pickup:"STATION 수령 대상"},
 {slug:"engineer-pz-59",brand:"ENGINEER",name:"나사 제거 플라이어",model:"PZ-59",price:33000,section:"SELECT",pickup:"STATION 수령 대상"},
 {slug:"makita-p-73069",brand:"MAKITA",name:"원형톱날",model:"P-73069",price:33000,section:"REFILL",pickup:"STATION 수령 대상"}
]
export const money=(v:number)=>new Intl.NumberFormat("ko-KR").format(v)+"원"
