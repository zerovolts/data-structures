module LinkedList exposing (..)


type LinkedList a
    = Empty
    | Node a (LinkedList a)


head : LinkedList a -> Maybe a
head list =
    case list of
        Empty ->
            Nothing

        Node x xs ->
            Just x


tail : LinkedList a -> Maybe (LinkedList a)
tail list =
    case list of
        Empty ->
            Nothing

        Node x xs ->
            Just xs


foldl : (a -> b -> b) -> b -> LinkedList a -> b
foldl f acc list =
    case list of
        Empty ->
            acc

        Node x xs ->
            foldl f (f x acc) xs


foldr : (a -> b -> b) -> b -> LinkedList a -> b
foldr f acc list =
    case list of
        Empty ->
            acc

        Node x xs ->
            f x (foldr f acc xs)


reverse : LinkedList a -> LinkedList a
reverse xs =
    foldl Node Empty xs


map : (a -> b) -> LinkedList a -> LinkedList b
map f xs =
    foldr (\x acc -> Node (f x) acc) Empty xs


filter : (a -> Bool) -> LinkedList a -> LinkedList a
filter pred list =
    foldr
        (\x acc ->
            if pred x then
                Node x acc
            else
                acc
        )
        Empty
        list


length : LinkedList a -> Int
length list =
    foldl (\_ acc -> acc + 1) 0 list
