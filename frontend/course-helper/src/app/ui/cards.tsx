import styles from './cards.module.css';
import Card from './card';
export default function Cards(){
    return (<div className={styles.cards}>
        <Card courseName='Classical Dynamics' imageURL='classical_dynamics.jpg' courseCode='PHY112' profName='Arijit Kundu' credits={11} description='Physics Course'/>
        <Card courseName='Single Variable Calculus' imageURL='math.jpg' courseCode='MTH111M' profName='Amit Kuber' credits={6} description='Single Variable Calculus Course'/>
        <Card courseName='Multi Variable Calculus' imageURL='math.jpg' courseCode='MTH112M' profName='PS Raj' credits={6} description='Multi Variable Calculus Course'/>
        <Card courseName='Physical Chemistry' imageURL='physical-chemistry-laboratory-equipment-GETERC.jpg' courseCode='CHM112M' profName='Prof' credits={4} description='Physical Chemistry Course'/>
        <Card courseName='English' imageURL='english.jpg' courseCode='ELC112' profName='Prof' credits={9} description='English Compulsory Course'/>
        </div>
        )
}