import React from 'react';
import { connect } from 'react-redux';
import PersonInfo from './PersonInfo/PersonInfo';
import animalStats from '../../../assets/animalStats';
import './PersonInfoHeader.css';

const PersonInfoHeader = ({familyCharacters, pets, currentCharacters}) => {

  const renderPersonInfo = (characterId, displayColorBool) => {
    const characterInfo = familyCharacters.find(character => character.id === characterId)
    const characterName = characterInfo.name;
    const characterAge = characterInfo.age;
    const characterPetInfo = pets.find(pet => pet.ownerId === characterId);
    const characterPetName = characterPetInfo.name;
    const characterPetTypeId = characterPetInfo.type;
    let petTypeInfo = '';
    for (let type in animalStats.types) {
      if (animalStats.types[type].id === characterPetTypeId) {
        petTypeInfo = animalStats.types[type];
      }
    }
    const characterPetTypeIcon = petTypeInfo.icon

    return (
      <PersonInfo
        characterName={characterName}
        characterAge={characterAge}
        characterPetName={characterPetName}
        characterPetTypeIcon={characterPetTypeIcon}
        characterColor={displayColorBool ? characterInfo.color : null}
      />
    );
  }

  return (
    <ul id="PersonInfoHeader">
      {renderPersonInfo(currentCharacters[0], true)}
      {currentCharacters[1]
        ? renderPersonInfo(currentCharacters[1])
        : null
      }
    </ul>
  );
};

const mapStateToProps = state => ({
  familyCharacters: state.family.characters,
  pets: state.pet.pets,
  currentCharacters: state.game.currentCharacters
})

export default connect(mapStateToProps,null)(PersonInfoHeader);