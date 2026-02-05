import type { Line } from '@files/manifests';
import { LessonStatus } from '@pages/Workspace/TranscriptionArea/SingleLine/singleLine.enum';

/**
 * Build the default lesson status object with correct indexing.
 * If the first line is a title, keys start at 0; otherwise, keys start at 1.
 */
export const buildDefaultLessonStatus = (lines: Line[]): Record<number, LessonStatus> => {
  const lessonsStatusObj: Record<number, LessonStatus> = {};
  const firstLineIndex = lines[0].isTitle ? 0 : 1;
  for (let i = firstLineIndex; i < lines.length + firstLineIndex; i += 1) {
    lessonsStatusObj[i] = LessonStatus.INCOMPLETE;
  }
  return lessonsStatusObj;
};
