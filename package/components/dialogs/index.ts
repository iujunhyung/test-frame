import { 
  fastDialog,
  fastDivider,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(
  fastDialog(),
  fastDivider(),
);

export * from "./blank-dialog";
export * from "./content-dialog";
export * from "./input-dialog";
export * from "./message-dialog";