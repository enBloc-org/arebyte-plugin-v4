/**
 *
 * @description the CMS sets the aspect ratio of videos in a descriptive string that needs to be searched for the correct ratio pattern and calculated based on those converted values
 * @param aspectRatioSetting i.e.: "rectangular (16:9)"
 * @returns the aspect ratio calculated out of the width and height described in the given string
 */
export default function parseAspectRatio(
  aspectRatioSetting: string
): number {
  const ratioExpression = new RegExp(/([1-9]{1,2}:[1-9]{1,2})/)
  const ratioPattern = aspectRatioSetting.match(ratioExpression)?.[0]

  if(!ratioPattern) return 16 / 9

  const [width, height] = ratioPattern.split(":")

  return parseInt(width) / parseInt(height)
}
