import React, { useEffect } from 'react';
import PersonInfoHeader from '../../components/View/PersonInfoHeader/PersonInfoHeader';
import NavInfoFooter from '../../components/View/NavInfoFooter/NavInfoFooter';
import './Tree.css';
import TreeGraph from 'react-d3-tree';
import { connect } from 'react-redux';
import { setCurrentCharacterForDetailView, setCurrentView } from '../../redux/gameRoot/actions/gameRootActions';
import { VIEW } from '../../assets/pages';

const Tree = ({setCurrentCharacterForDetailView, setCurrentView, characters}) => {

  const generateTreeData = () => {
    const charactersSortedById = characters.sort((a,b) => {
      a = a.id;
      b = b.id;
      return a - b;
    })
    let familyTree = [];

    for (let i=0;i<charactersSortedById.length - 1;i++) {
      let currentCharacter = charactersSortedById[i];
      if (currentCharacter.partnerLeader && currentCharacter.parentId === 'ROOT') {
        console.log(currentCharacter);
          familyTree.push({characterId: i, name: currentCharacter.name, children: findCharacterChildren(i, charactersSortedById), nodeSvgShape: {shape: 'circle', shapeProps: { r: 10, fill: currentCharacter.color.hexCode}}})
      }
    }
    return familyTree;
  }

  const findCharacterChildren = (characterId, sortedCharacters) => {
    let children = [];
    for (let i=characterId + 1;i<=sortedCharacters.length - 1;i++) {
      let currentCharacter = sortedCharacters[i]
      if (currentCharacter.parentId === characterId) {
        children.push({characterId: i, name: currentCharacter.name, children: findCharacterChildren(i, sortedCharacters), nodeSvgShape: {shape: 'circle', shapeProps: { r:10,  fill: currentCharacter.color.hexCode}}})
      }
    }
    return children;
  }

  return (
    <div className="tree">
      <PersonInfoHeader />
      <TreeGraph 
        data={generateTreeData()} 
        onClick={(nodeData) => {
          setCurrentCharacterForDetailView(nodeData.characterId);
          setCurrentView(VIEW.CHARACTER_INFO);
        }}
        onMouseOver={(nodeData) => {
          console.log(nodeData)
        }}
        collapsible={false}
        orientation={'vertical'}
        translate={{x: window.screen.width / 2, y: window.screen.height / 6 > 120 ? window.screen.height / 6 : 120}}
        pathFunc={'elbow'}
      />
      <NavInfoFooter />
    </div>
  );
};

const mapStateToProps = state => ({
  characters: state.family.characters
})

const mapDispatchToProps = dispatch => ({
  setCurrentCharacterForDetailView: (characterId) => dispatch(setCurrentCharacterForDetailView(characterId)),
  setCurrentView: (view) => dispatch(setCurrentView(view))
})

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Tree));