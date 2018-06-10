module BinaryTree exposing (..)


type BinaryTree a
    = Empty
    | Branch a (BinaryTree a) (BinaryTree a)


left : BinaryTree a -> Maybe (BinaryTree a)
left tree =
    case tree of
        Empty ->
            Nothing

        Branch x left right ->
            Just left


right : BinaryTree a -> Maybe (BinaryTree a)
right tree =
    case tree of
        Empty ->
            Nothing

        Branch x left right ->
            Just right


{-| Pre-order Traversal
-}
foldPre : (a -> b -> b) -> b -> BinaryTree a -> b
foldPre f acc tree =
    case tree of
        Empty ->
            acc

        Branch x left right ->
            f x (foldPre f (foldPre f acc right) left)


{-| In-order Traversal
-}
foldIn : (a -> b -> b) -> b -> BinaryTree a -> b
foldIn f acc tree =
    case tree of
        Empty ->
            acc

        Branch x left right ->
            foldIn f (f x (foldIn f acc right)) left


{-| Post-order Traversal
-}
foldPost : (a -> b -> b) -> b -> BinaryTree a -> b
foldPost f acc tree =
    case tree of
        Empty ->
            acc

        Branch x left right ->
            foldPost f (foldPost f (f x acc) right) left


map : (a -> b) -> BinaryTree a -> BinaryTree b
map f tree =
    case tree of
        Empty ->
            Empty

        Branch x left right ->
            Branch (f x) (map f left) (map f right)


size : BinaryTree a -> Int
size tree =
    foldPre (\_ acc -> acc + 1) 0 tree


preOrder =
    Branch 1
        (Branch 2
            (Branch 3
                Empty
                (Branch 4 Empty Empty)
            )
            Empty
        )
        (Branch 5
            Empty
            (Branch 6
                (Branch 7 Empty Empty)
                (Branch 8 Empty Empty)
            )
        )
