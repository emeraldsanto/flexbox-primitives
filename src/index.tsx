import { Children } from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';

export interface FlexProps extends ViewProps,
  Pick<
    ViewStyle,
    | 'alignItems'
    | 'flex'
    | 'flexBasis'
    | 'flexDirection'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexWrap'
    | 'justifyContent'
  > {
  flexGap?: number
}

export function Flex({
  children,
  flex,
  flexBasis,
  flexDirection,
  flexGap,
  flexGrow,
  flexShrink,
  flexWrap,
  style,
  ...rest
}: FlexProps) {
  const sizeProperty = flexDirection === 'row' ? 'width' : 'height' as const;

  return (
    <View
      {...rest}
      style={[
        {
          flex,
          flexBasis,
          flexDirection,
          flexGrow,
          flexShrink,
          flexWrap,
        },
        style,
      ]}
    >
      {flexGap == null ? (
        children
      ) : Children.map(children, (child, index) => (
        <>
          {child}

          {index !== Children.count(children) - 1 && (
            <View accessibilityElementsHidden accessibilityLiveRegion='none' accessible={false} importantForAccessibility='no' style={{ [sizeProperty]: flexGap }} />
          )}
        </>
      ))}
    </View>
  );
}

export function Column(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection='column' />;
}

export function Row(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection='row' />;
}
