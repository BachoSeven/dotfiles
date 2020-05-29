(** User Mathematica initialization file **)
With[{dir = $UserDocumentsDirectory <> "/Wolfram Mathematica"},
  If[DirectoryQ[dir], DeleteDirectory[dir]]
]
With[{dir = $UserDocumentsDirectory <> "/.Wolfram"},
  If[DirectoryQ[dir], DeleteDirectory[dir, DeleteContents->True]]
]
