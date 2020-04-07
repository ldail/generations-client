import React, { useState } from 'react';
import './FamilySetup.css';
import { connect } from 'react-redux';
import { setFamilyName, setBoyName, setPrimaryAttribute, setStarterPetChoice, setPetName, setPetType } from '../../redux/familyRoot/actions/familyRootActions';
import messageGroupings from '../../assets/messages';
import xss from 'xss';
import animalStats from '../../assets/animalStats';
import smallBoy from '../../assets/smallboy.jpg';

const FamilySetup = ({setFamilyName, setBoyName, setPrimaryAttribute, setStarterPetChoice, family, setStarterPetChoiceType, setPetName}) => {
  const {familySetup} = messageGroupings;
  const {primaryAttributes, startingPet} = familySetup;
  // const {messages: primaryAttributeMessages} = primaryAttributes;

  const [familyNameValue, setFamilyNameValue] = useState('');
  const [setupPageIndex, setSetupPageIndex] = useState(0);
  const [boyNameValue, setBoyNameValue] = useState('');
  const [petNameValue, setPetNameValue] = useState('');
  const [currentChoice, setCurrentChoice] = useState(0);
  const [currentMessageGrouping, setCurrentMessageGrouping] = useState(0);

  const handleBack = e => {
    if (e) {
      e.preventDefault();
    }
    if (setupPageIndex > 0) {
      setSetupPageIndex(setupPageIndex - 1);
    }
    else {
      //TODO: Add modal for `can't go back farther` or bring them back to intro page
      return;
    }
  }

  const handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    //Choosing a last/family name
    if (setupPageIndex === 0) {
      if (familyNameValue) {
        let safe = xss(familyNameValue);
        setFamilyName(safe);
        setSetupPageIndex(setupPageIndex + 1);
      }
    }
    //Choosing the boy's first name
    else if (setupPageIndex === 1) {
      if (boyNameValue) {
        let safe = xss(boyNameValue);
        setBoyName(safe);
        setSetupPageIndex(setupPageIndex + 1);
        setCurrentMessageGrouping(primaryAttributes)
      }
    }
    //Choosing a primary attribute
    else if (setupPageIndex === 2) {
      setPrimaryAttribute(currentChoice);
      setCurrentChoice(0);
      setSetupPageIndex(setupPageIndex + 1);
      setCurrentMessageGrouping(startingPet)
    }
    //Choosing a pet
    else if (setupPageIndex === 3) {
      setStarterPetChoice(currentChoice);
      let starterPetType = '';
      for (let [key, value] of Object.entries(animalStats.types)) {
        if (value.id === currentChoice) {
          starterPetType = value.name;
        }
      }
      setStarterPetChoiceType(starterPetType)
      setCurrentChoice(0);
      setSetupPageIndex(setupPageIndex + 1);
    }
    //Choosing a pet name
    else if (setupPageIndex === 4) {
      setPetName(petNameValue);
      setSetupPageIndex(setupPageIndex + 1);
    }
  }
  
  const rotateChoice = (value) => {
    //If they move through past the last item
    if (currentChoice === currentMessageGrouping.messages.length - 1 && value === 1) {
      setCurrentChoice(0);
    }
    //If they go backwards before the first item
    else if (currentChoice === 0 && value === -1) {
      setCurrentChoice(currentMessageGrouping.messages.length - 1)
    }
    else {
      setCurrentChoice(currentChoice + value);
    }
  }

  const displayPet = () => {
    console.log(startingPet.messages)
  let entries = Object.entries(startingPet.messages[currentChoice].stats)
  console.log(entries);
  let mapped = entries.map(statObject => {
    console.log(statObject);
    return (
    <li className="statInfo" key={statObject[0]}>
      <span className="statTitle">{statObject[0]}: </span>
      <span className="statValue">{statObject[1].value}</span>
      <span className="growthRate">{statObject[1].growthRate}</span>
    </li>
    )
  })
  console.log(mapped);
  return mapped;
  }


  const familySetupModal = () => {
    if (setupPageIndex === 0) {
      return (
        <>
          <p className="familyQuestion">What is your family's name?</p>
          <div className="familyName">
            <span>The</span>
            <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" required value={familyNameValue} onChange={(e) => setFamilyNameValue(e.target.value)} onFocus={() => setFamilyNameValue('')} />
            </form>
            <span>Family</span>
          </div>
        </>
      );
    }
    else if (setupPageIndex === 1) {
      return (
        <>
          <p className="familyQuestion">And what was that boy's name? The one you held so tightly?</p>
          <div className="familyName">
            <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" required value={boyNameValue} onChange={(e) => setBoyNameValue(e.target.value)} onFocus={() => setBoyNameValue('')} />
            </form>
          </div>
        </>
      )
    }
    else if (setupPageIndex === 2) {
      return (
        <>
          <p className="familyQuestion">{primaryAttributes.prompt}</p>
          <div className="rotatingMenuChoice">
            <form id="rotatingMenuChoice" onSubmit={(e) => handleSubmit(e)}>
              <ul>

                <li className="rotatingChoice">
                  <div className="choiceTitle">
                    <img src="#" alt="left" className="arrowIcon" onClick={() => rotateChoice(-1)} />
                    <img src={primaryAttributes.messages[currentChoice].icon} alt="icon" />
                    <h4>{primaryAttributes.messages[currentChoice].name}</h4>
                    <img src="#" alt="right" className="arrowIcon" onClick={() => rotateChoice(1)}/>
                  </div>
                  <p>{primaryAttributes.messages[currentChoice].description}</p>
                  <span className="statIncrease">{primaryAttributes.messages[currentChoice].stat}</span>  
                </li>

              </ul>
            </form>
          </div>
        </>
      )
    }
    else if (setupPageIndex === 3) {
      return (
        <>
          <p className="familyQuestion">{startingPet.prompt}</p>
          <div className="rotatingMenuChoice">
            <form id="rotatingMenuChoice" onSubmit={(e) => handleSubmit(e)}>
              <ul>

                <li className="rotatingChoice">
                  <div className="choiceTitle">
                    <img src="#" alt="left" className="arrowIcon" onClick={() => rotateChoice(-1)} />
                    <img src={startingPet.messages[currentChoice].icon? '##' : '#'} alt="icon" />
                    <h4>{startingPet.messages[currentChoice].name}</h4>
                    <img src="#" alt="right" className="arrowIcon" onClick={() => rotateChoice(1)}/>
                  </div>
                  <h5>Level 10</h5>
                  <ul>
                    {displayPet()}

                  </ul>
                </li>
              </ul>
            </form>
          </div>
        </>
      )
    }
    else if (setupPageIndex === 4) {
      return (
        <>
          <p className="familyQuestion">And what was that pet's name?</p>
          <div className="familyName">
            <form id="familyName" onSubmit={(e) => handleSubmit(e)}>
              <input type="text" required value={petNameValue} onChange={(e) => setPetNameValue(e.target.value)} onFocus={() => setPetNameValue('')} />
            </form>
          </div>
        </>
      )
    }
    else if (setupPageIndex === 5) {
      return (
        <>
          <p className="familyQuestion">Okay. Does everything look right?</p>
          <div className="familyName">
            <div className="person">
              <img src={smallBoy} alt="boy" />
              <div className="familyInfo">
                <h4>{family.boyName}</h4>
                <img src={primaryAttributes.messages[family.primaryAttribute].icon} alt={primaryAttributes.messages[family.primaryAttribute].name} />
                <span>{primaryAttributes.messages[family.primaryAttribute].name}</span>
              </div>
            </div>
            <div className="pet">
              <img src={() => {
                for (let [key,value] of animalStats.types) {
                  if (value.id === family.starterPet)
                  console.log('found it');
                  console.log(animalStats.types[key].icon)
                    return animalStats.types[key].icon;
                }
                console.log('could not find');
              }} alt="animal" />
              <div className="familyInfo">
                <h4>{family.petName}</h4>
                <span>{family.petType}</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <div id="FamilySetup">
      <div className="familyBar">The <span className="bold">{familyNameValue}</span> Family <span className="topIcon">{setupPageIndex > 2 ? <img src={familySetup.primaryAttributes.messages[family.primaryAttribute].icon} alt={familySetup.primaryAttributes.messages[family.primaryAttribute].name} /> : ''}</span></div>
      {setupPageIndex > 0 ? <div className="nameBar">{boyNameValue} {familyNameValue}</div> : ''}
      {setupPageIndex > 3 ? <div className="petBar">{petNameValue} - Level 10 - <span className="topIcon"><img src={() => {
        for (let [key,value] of animalStats.types) {
          if (value.id === family.starterPet)
          console.log('found it');
          console.log(animalStats.types[key].icon)
            return animalStats.types[key].icon;
        }
        console.log('could not find');
      }} alt="animal" /></span></div> : ''}
      {familySetupModal()}
      <div className="continueButtons">
        <button type="button" onClick={(e) => handleBack(e)}>Back</button>
        <button type="forward" onClick={(e) => handleSubmit(e)}>Forward</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  family: state.family
});

const mapDispatchToProps = dispatch => ({
  setFamilyName: (familyName) => dispatch(setFamilyName(familyName)),
  setBoyName: (boyName) => dispatch(setBoyName(boyName)),
  setPrimaryAttribute: (primaryAttribute) => dispatch(setPrimaryAttribute(primaryAttribute)),
  setStarterPetChoice: (starterPet) => dispatch(setStarterPetChoice(starterPet)),
  setPetName: (petNameValue) => dispatch(setPetName(petNameValue)),
  setStarterPetChoiceType: (starterPetType) => dispatch(setPetType(starterPetType))
})

export default connect(mapStateToProps,mapDispatchToProps)(FamilySetup);