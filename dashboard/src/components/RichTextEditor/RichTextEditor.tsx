import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import { CreateCSSProperties } from "@material-ui/styles/withStyles";
import { ChangeEvent } from "@temp/hooks/useForm";
import classNames from "classnames";
import { RawDraftContentState, convertFromRaw, convertToRaw } from "draft-js";
import {convertToHTML, convertFromHTML} from 'draft-convert';
import {
  BLOCK_TYPE,
  DraftailEditor,
  ENTITY_TYPE,
  INLINE_STYLE
} from "draftail";
import isEqual from "lodash-es/isEqual";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import { FormattedMessage } from "react-intl";

import BoldIcon from "../../icons/BoldIcon";
import HeaderOne from "../../icons/HeaderOne";
import HeaderThree from "../../icons/HeaderThree";
import HeaderTwo from "../../icons/HeaderTwo";
import ItalicIcon from "../../icons/ItalicIcon";
import LinkIcon from "../../icons/LinkIcon";
import OrderedListIcon from "../../icons/OrderedListIcon";
import QuotationIcon from "../../icons/QuotationIcon";
import StrikethroughIcon from "../../icons/StrikethroughIcon";
import UnorderedListIcon from "../../icons/UnorderedListIcon";
import LinkEntity from "./LinkEntity";
import LinkSource from "./LinkSource";
import {commonMessages} from "@temp/intl";

export interface RichTextEditorProps {
  disabled: boolean;
  error: boolean;
  helperText: string;
  initial?: RawDraftContentState;
  label: string;
  name: string;
  scroll?: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  isJson?: boolean
}

const useStyles = makeStyles(
    theme => {
      const editorContainer: CreateCSSProperties = {
        border: `1px ${theme.palette.divider} solid`,
        borderRadius: 4,
        padding: "27px 12px 10px",
        position: "relative",
        transition: theme.transitions.duration.shortest + "ms"
      };

      return {
        editorContainer,
        error: {
          color: theme.palette.error.main
        },
        helperText: {
          marginTop: theme.spacing(0.75)
        },
        input: {
          position: "relative"
        },
        label: {
          fontSize: theme.typography.caption.fontSize,
          left: 12,
          position: "absolute",
          top: 9
        },
        linkIcon: {
          marginTop: 2
        },
        root: {
          "& .DraftEditor": {
            "&-editorContainer": {
              "& .public-DraftEditor-content": {
                lineHeight: 1.62
              },
              "& a": {
                color: theme.palette.primary.light
              },
              "&:after": {
                background: theme.palette.getContrastText(
                    theme.palette.background.default
                ),
                bottom: -11,
                content: "''",
                display: "block",
                height: 2,
                left: -12,
                position: "absolute",
                transform: "scaleX(0) scaleY(0)",
                width: "calc(100% + 24px)"
              },
              position: "relative"
            },
            "&-root": {
              ...theme.typography.body1
            }
          },
          "& .Draftail": {
            "&-Editor": {
              "&--focus": {
                boxShadow: `inset 0px 0px 0px 2px ${theme.palette.primary.main}`
              },
              "&:hover": {
                borderColor: theme.palette.primary.main
              },
              ...editorContainer
            },
            "&-Toolbar": {
              "&Button": {
                "& svg": {
                  padding: 2
                },
                "&--active": {
                  "&:hover": {
                    background: theme.palette.primary.main
                  },
                  "&:not(:hover)": {
                    borderRightColor: theme.palette.primary.main
                  },
                  background: theme.palette.primary.main
                },
                "&:focus": {
                  "&:active": {
                    "&:after": {
                      background: fade(theme.palette.primary.main, 0.3),
                      borderRadius: "100%",
                      content: "''",
                      display: "block",
                      height: "100%",
                      width: "100%"
                    }
                  }
                },
                "&:hover": {
                  background: fade(theme.palette.primary.main, 0.3)
                },
                alignItems: "center",
                background: "none",
                border: "none",
                borderRight: `1px ${theme.palette.divider} solid`,
                color: theme.typography.body1.color,
                cursor: "pointer",
                display: "inline-flex",
                height: 36,
                justifyContent: "center",
                padding: theme.spacing(1) + 2,
                transition: theme.transitions.duration.short + "ms",
                width: 36
              },
              "&Group": {
                "&:last-of-type": {
                  "& .Draftail-ToolbarButton": {
                    "&:last-of-type": {
                      border: "none"
                    }
                  }
                },
                display: "flex"
              },
              background: theme.palette.background.default,
              border: `1px ${theme.palette.divider} solid`,
              display: "inline-flex",
              flexWrap: "wrap",
              marginBottom: theme.spacing(),
              marginTop: 10,
              [theme.breakpoints.down(460)]: {
                width: "min-content"
              }
            },
            "&-block": {
              "&--blockquote": {
                borderLeft: `2px solid ${theme.palette.divider}`,
                margin: 0,
                padding: theme.spacing(1, 2)
              }
            }
          },
          "&$error": {
            "& .Draftail": {
              "&-Editor": {
                borderColor: theme.palette.error.main
              }
            }
          }
        },
        scroll: {
          "& .DraftEditor": {
            "&-editorContainer": {
              "& .public-DraftEditor-content": {
                lineHeight: 1.62
              }
            }
          }
        },
        smallIcon: {
          marginLeft: 10
        }
      };
    },
    { name: "RichTextEditor" }
);

const exporterConfig = {
  blockToHTML: (block) => {
    if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
      return <blockquote />
    }

    // Discard atomic blocks, as they get converted based on their entity.
    if (block.type === BLOCK_TYPE.ATOMIC) {
      return {
        start: "",
        end: "",
      }
    }

    return null
  },

  entityToHTML: (entity, originalText) => {
    if (entity.type === ENTITY_TYPE.LINK) {
      return <a href={entity.data.url}>{originalText}</a>
    }

    if (entity.type === ENTITY_TYPE.IMAGE) {
      return <img src={entity.data.src} alt={entity.data.alt} />
    }

    if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
      return <hr />
    }

    return originalText
  },
}

const importerConfig = {
  htmlToEntity: (nodeName, node, createEntity) => {
    // a tags will become LINK entities, marked as mutable, with only the URL as data.
    if (nodeName === "a") {
      return createEntity(ENTITY_TYPE.LINK, "MUTABLE", { url: node.href })
    }

    if (nodeName === "img") {
      return createEntity(ENTITY_TYPE.IMAGE, "IMMUTABLE", {
        src: node.src,
      })
    }

    if (nodeName === "hr") {
      return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, "IMMUTABLE", {})
    }

    return null
  },
  htmlToBlock: (nodeName) => {
    if (nodeName === "hr" || nodeName === "img") {
      // "atomic" blocks is how Draft.js structures block-level entities.
      return "atomic"
    }

    return null
  },
}

function handleSave(
    value: any,
    initial: any,
    name: string,
    onChange: (event: ChangeEvent) => void,
    isJson?: boolean
) {
  if (value && !isEqual(value, initial)) {
    if (isJson){
      onChange({
        target: {
          name,
          value: value
        }
      });
    }else{
      const html = convertToHTML(exporterConfig)(convertFromRaw(value));
      onChange({
        target: {
          name,
          value: html
        }
      });
    }

  }
}

const RichTextEditor: React.FC<RichTextEditorProps> = props => {
  const { error, helperText, initial, label, name, scroll, onChange, isJson } = props;
  const fromHTML = (html) => convertToRaw(convertFromHTML(importerConfig)(html))

  const classes = useStyles(props);
  return (
      <div
          className={classNames({
            [classes.error]: error,
            [classes.root]: true,
            [classes.scroll]: scroll
          })}
      >
        <div className={classes.input}>
          <Typography className={classes.label} variant="caption" color="primary">
            {label}
          </Typography>
          <ErrorBoundary
              FallbackComponent={() => (
                  <div className={classes.editorContainer}>
                    <Typography color="error">
                      <FormattedMessage {...commonMessages.invalidContent}
                                        description="rich text error"
                      />
                    </Typography>
                  </div>
              )}
          >
            <DraftailEditor
                key={initial}
                rawContentState={initial ? isJson ? initial : fromHTML(initial) : null}
                onSave={value => handleSave(value, initial, name, onChange, isJson)}
                blockTypes={[
                  {
                    icon: <HeaderOne />,
                    type: BLOCK_TYPE.HEADER_ONE
                  },
                  { icon: <HeaderTwo />, type: BLOCK_TYPE.HEADER_TWO },
                  { icon: <HeaderThree />, type: BLOCK_TYPE.HEADER_THREE },
                  { icon: <QuotationIcon />, type: BLOCK_TYPE.BLOCKQUOTE },
                  {
                    icon: <UnorderedListIcon />,
                    type: BLOCK_TYPE.UNORDERED_LIST_ITEM
                  },
                  { icon: <OrderedListIcon />, type: BLOCK_TYPE.ORDERED_LIST_ITEM }
                ]}
                inlineStyles={[
                  {
                    icon: <BoldIcon className={classes.smallIcon} />,
                    type: INLINE_STYLE.BOLD
                  },
                  {
                    icon: <ItalicIcon className={classes.smallIcon} />,
                    type: INLINE_STYLE.ITALIC
                  },
                  {
                    icon: <StrikethroughIcon />,
                    type: INLINE_STYLE.STRIKETHROUGH
                  }
                ]}
                enableLineBreak
                entityTypes={[
                  {
                    attributes: ["url"],
                    decorator: LinkEntity,
                    icon: <LinkIcon className={classes.linkIcon} />,
                    source: LinkSource,
                    type: ENTITY_TYPE.LINK,
                  }
                ]}
            />
          </ErrorBoundary>
        </div>
        {helperText && (
            <Typography
                className={classNames({
                  [classes.error]: error,
                  [classes.helperText]: true
                })}
                variant="caption"
            >
              {helperText}
            </Typography>
        )}
      </div>
  );
};

RichTextEditor.displayName = "RichTextEditor";
RichTextEditor.defaultProps = {
  scroll: true
};
export default RichTextEditor;
