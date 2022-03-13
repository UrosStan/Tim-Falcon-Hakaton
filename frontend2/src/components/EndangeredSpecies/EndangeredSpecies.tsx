import React, { useState } from 'react';
import styles from "./EndangeredSpecies.module.scss";
import EndangeredSpeciesCard from '../EndangeredSpeciesCard/EndangeredSpeciesCard';
import Sheep from '../../images/goat.png';
import Leopard from '../../images/jaguar.png';
import Rhino from '../../images/rhino.png';
import Snail from '../../images/snail.png';
import Kakapo from '../../images/parrot.png';
import Albatros from '../../images/crane.png';
import Vaquita from '../../images/dolphin.png'
import { ConservationStatus } from '../../models/Enums';



const EndangeredSpecies = () => {
    const [conservationStatus, setConservationStatus] = useState<number>(1);
    const statusesArray = Object.values(ConservationStatus)
    let handleConservationStatus = (event) =>{
        setConservationStatus(+event.target.value)
    }
    return(
        <section className={styles.endangeredSpecies}>
            <div className={styles.endangeredSpeciesContainer}>
            <h1>Endangered Species</h1>
            <div>
                FILTER:
                <label htmlFor="conservationStatus">
                Conservation Status
                <input type="range" name="conservationStatus" onChange={handleConservationStatus} min="1" max="8"/>
                </label>
                {conservationStatus && <div>{statusesArray[statusesArray.length-conservationStatus]}</div>}
            </div>
            <div className={styles.cards}>
                <EndangeredSpeciesCard img={ Sheep } text="Barbary Sheep" left= "5,000 - 10,000" habitat="North America, Europe"/>
                <EndangeredSpeciesCard img={ Leopard } text="Amur Leopard" left= "70" habitat="Asia"/>
                <EndangeredSpeciesCard img={ Rhino } text="White Rhino" left= "2" habitat="Africa"/>
                <EndangeredSpeciesCard img={ Kakapo } text="Kakapo" left= "208" habitat="Australia"/>
                <EndangeredSpeciesCard img={ Snail } text="Oahu Tree Snails" left= "19 - 41" habitat="North America"/>
                <EndangeredSpeciesCard img={ Vaquita } text="Vaquita" left= "10" habitat="South America"/>
                <EndangeredSpeciesCard img={ Albatros } text="Amsterdam Albatros" left= "130" habitat="North America, Europe"/>
            </div>
            </div>
        </section>
    )
}

export default EndangeredSpecies;