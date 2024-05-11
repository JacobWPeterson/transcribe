import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {
  StyledH1, StyledH2, HelpSection, HelpText, PageWrapper, PopoverHeader, StyledBadge, StyledCustomPillBadge, StyledLink, StyledP, StyledTable, SymbolCell
} from '../../styles.js';

const Guide = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="guide">
      <StyledH1 textAlign="center">Guide</StyledH1>
      <StyledH2 color="#333" textAlign="left">Symbols</StyledH2>
      <StyledTable>
        <tr style={{ height: '50px' }}>
          <SymbolCell>
            <OverlayTrigger
              key='title-help'
              placement="top"
              rootClose
              transition
              trigger={['hover', 'focus']}
              overlay={(
                <Popover id="popover-hint">
                  <Popover.Body>
                    Titles can be plain or feature elaborate patterns. Titles often feature ligatures and abbreviations and can be much more difficult to read, so don't worry about them as much early on. Type them as a single line.
                  </Popover.Body>
                </Popover>
              )}
            >
              <StyledCustomPillBadge margin="0" tabIndex={0} background="#6c757d" padding="2px 5px">?</StyledCustomPillBadge>
            </OverlayTrigger>
          </SymbolCell>
          <td>

            <StyledP fontSize={14}>
              This icon appears next to titles on images. Titles can be plain or feature elaborate patterns. Titles often feature ligatures and abbreviations and can be much more difficult to read, so don't worry about them as much early on. Type them as a single line.
            </StyledP>
          </td>
        </tr>
        <tr style={{ height: '50px' }}>
          <SymbolCell>
            <OverlayTrigger
              key="NC-example"
              placement="top"
              rootClose
              transition
              trigger='click'
              overlay={(
                <Popover id="popover-concepts">
                  <PopoverHeader as="h3">New Concept</PopoverHeader>
                  <Popover.Body>
                    Here you'll find some useful information
                    &nbsp;
                    <StyledLink href={`/glossary`} target="_blank">And maybe a link to the glossary</StyledLink>
                  </Popover.Body>
                </Popover>
              )}
            >
              <StyledCustomPillBadge margin="0" tabIndex={0} background="#c9ac5f">NC</StyledCustomPillBadge>
            </OverlayTrigger>
          </SymbolCell>
          <td>
            <StyledP fontSize={14}>
              The golden "NC" icon indicates there is a "New Concept" being introduced on that particular line of the manuscript. Clicking the NC icon will show a popup with a brief introduction to the concept and a link to the glossary to learn more.
            </StyledP>
          </td>
        </tr>
        <tr style={{ height: '50px' }}>
          <SymbolCell>
            <OverlayTrigger
              key="error-tooltip"
              placement="top"
              rootClose
              transition
              trigger={['hover', 'focus']}
              overlay={(
                <Popover id="popover-error">
                  <Popover.Body>
                    Answer is incorrect
                  </Popover.Body>
                </Popover>
              )}
            >
              <StyledBadge margin="0" tabIndex={0} pill bg="danger">
                X
              </StyledBadge>
            </OverlayTrigger>
          </SymbolCell>
          <td>
            <StyledP fontSize={14}>
              This icon appears after submitting an incorrect answer. Hovering over the icon will reveal more details, such as if the answer is too short or too long.
            </StyledP>
          </td>
        </tr>
        <tr style={{ height: '50px' }}>
          <SymbolCell>
            <OverlayTrigger
              key='hint-icon'
              placement="top"
              rootClose
              transition
              trigger={['hover', 'focus']}
              overlay={(
                <Popover id="popover-hint">
                  <Popover.Body>
                    Incorrect letter: σ(10)
                  </Popover.Body>
                </Popover>
              )}
            >
              <StyledCustomPillBadge margin="0" tabIndex={0} background="#3e5276">?</StyledCustomPillBadge>
            </OverlayTrigger>
          </SymbolCell>
          <td>
            <StyledP fontSize={14}>
              After three incorrect attempts of the correct length, this icon appears. Hovering over the icon reveals which letter(s) is incorrect, giving the letter you have entered and its position on the line.
            </StyledP>
          </td>
        </tr>
        <tr style={{ height: '50px' }}>
          <SymbolCell>
            <StyledBadge margin="0" pill bg="success">
              Correct!
            </StyledBadge>
          </SymbolCell>
          <td>
            <StyledP fontSize={14}>
              Congrats, you've answered correctly.
            </StyledP>
          </td>
        </tr>
      </StyledTable>
      <StyledH2 color="#333" textAlign="left">How-to</StyledH2>
    </HelpSection>
  </PageWrapper>
);

export default Guide;
