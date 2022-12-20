import React from 'react';
import tw from 'tailwind-styled-components';

interface LabelProps {
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
}

function TutorialOption() {
  return (
    <div>
      <TutorialOptions htmlFor="todolist">
        <input type="checkbox" id="todolist" onChange={(e) => console.log(e.target.id)} />
        <span className="ml-2">todolist</span>
      </TutorialOptions>
      <br />
      <TutorialOptions htmlFor="todayquestion">
        <input type="checkbox" id="todayquestion" />
        <span className="ml-2">오늘의 질문</span>
      </TutorialOptions>
      <br />
      <TutorialOptions htmlFor="emotiondiary">
        <input type="checkbox" id="emotiondiary" />
        <span className="ml-2">감정 일기</span>
      </TutorialOptions>
      <br />
      <TutorialOptions htmlFor="accountbook">
        <input type="checkbox" id="accountbook" />
        <span className="ml-2">가계부</span>
      </TutorialOptions>
    </div>
  );
}

export default TutorialOption;

export const TutorialOptions = tw.label<LabelProps>`
  my-4 
  text-gray-500 
  leading-relaxed
  flex
  items-center
  ${(props) => props.textSize ?? 'text-lg'}
`;
