import StatsCard from "../components/dashboard/StatsCard"

export default function Dashboard(){

 return(

  <div className="p-8 w-full">

   <div className="grid grid-cols-3 gap-6">

    <StatsCard title="Rows" value="0"/>
    <StatsCard title="Columns" value="0"/>
    <StatsCard title="Missing Values" value="0"/>

   </div>

  </div>

 )

}