(** User Mathematica initialization file **)
(* Remove useless directories :) *)
With[{dir = $UserDocumentsDirectory <> "/Wolfram Mathematica"},
  If[DirectoryQ[dir], DeleteDirectory[dir]]
]
With[{dir = $UserDocumentsDirectory <> "/.Wolfram"},
  If[DirectoryQ[dir], DeleteDirectory[dir, DeleteContents->True]]
]
