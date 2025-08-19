### Leetcode 2868 (Hard): The Wording Game [Practice](https://leetcode.com/problems/the-wording-game)

### Description  
Alice and Bob play a turn-based game using their own **lexicographically sorted word lists**, `a` for Alice and `b` for Bob. The rules:
- Alice starts by playing her **smallest** word.
- On each turn, the current player must pick a word from their list that is **"closely greater"** than the last word played.
  - A word `w` is "closely greater" than `z` if:
    - `w` is lexicographically greater than `z`
    - The first letter of `w` is either **the same** as or **immediately follows** the first letter of `z` in the alphabet
- If a player cannot play a word on their turn, they lose.
Determine if Alice can **guarantee a win**, assuming both play optimally.

### Examples  

**Example 1:**  
Input: `a = ["avokado","dabar"]`, `b = ["brazil"]`  
Output: `false`  
*Explanation: Alice must start with "avokado". Bob can play "brazil" (first letter 'b' follows 'a', and "brazil" > "avokado"). Alice's only remaining word starts with 'd', which cannot validly follow 'b'. So Alice loses.*

**Example 2:**  
Input: `a = ["ananas","atlas","banana"]`, `b = ["albatros","cikla","nogomet"]`  
Output: `true`  
*Explanation: Alice starts with "ananas". Bob's only possible response is "albatros" (starts with 'a', but must be > "ananas"), but "albatros" < "ananas" so he can't play. Bob loses immediately.*

**Example 3:**  
Input: `a = ["harp","kary"]`, `b = ["gale","kase"]`  
Output: `true`  
*Explanation: Alice starts with "harp". Bob can't play "gale" (g < h), nor "kase" (k is after h but "kase" < "harp"), so Bob cannot play. Alice wins right away.*

### Thought Process (as if you’re the interviewee)  
- First, brute-force: Simulate every possible sequence of moves with recursion. Try every valid next move from a given state (whose word list, what words are left, what was the last word).
- This will be exponential in time; need to optimize.
- Key: At each step, track whose turn, which words are left in each list, and the last word played.
- Since the lists are sorted, we can use this to speed up candidate searches (using bisect/binary search to find the "next closely greater" word), and use memoization/dynamic programming to avoid redundant work.
- State: (`whose turn`, `index in Alice`, `index in Bob`, `last word`)
  - But since lists are sorted and we always remove used words, we can uniquely name the state by current word list indices and whose turn.
- If from a given state the *current player* can force a win by any valid move, we mark this as winning for them; otherwise, losing.
- This is a classic *recursive game simulation with memoization* pattern, similar to minimax (two-player game theory).

### Corner cases to consider  
- One or both lists have only one word.
- Words with the same prefix ("ab", "abc").
- No possible valid next move for either player right away.
- Many words sharing the same starting letter.
- Alice's initial move blocking all of Bob's options.

### Solution

```python
def wordingGame(a, b):
    # Import needed for string operations
    from functools import lru_cache

    n, m = len(a), len(b)

    # Helper: Find the smallest valid word in 'lst' > prev_word with valid first letter
    def next_valid(lst, used_mask, prev_word):
        prev_c = prev_word[0]
        candidates = []
        for i, word in enumerate(lst):
            # Skip if already used
            if (used_mask >> i) & 1:
                continue
            # Rules: lex greater, first char same or next
            if word > prev_word and (
                word[0] == prev_c or
                ord(word[0]) == ord(prev_c) + 1
            ):
                candidates.append(i)
        return candidates

    # Since length is up to 10, we can use bitmask for used indicators
    @lru_cache(maxsize=None)
    def can_win(turn, a_mask, b_mask, last_word):
        # turn: 0 for Alice, 1 for Bob
        # Return: True if current player can force a win

        if turn == 0:
            # Alice's move
            nexts = next_valid(a, a_mask, last_word)
            if not nexts:
                return False  # No move: she loses
            for idx in nexts:
                if not can_win(1, a_mask | (1 << idx), b_mask, a[idx]):
                    return True  # If Bob cannot win from this branch, Alice guarantees a win
            return False  # Otherwise, Alice cannot force win
        else:
            # Bob's move
            nexts = next_valid(b, b_mask, last_word)
            if not nexts:
                return True  # No move: Bob loses, Alice wins
            for idx in nexts:
                if not can_win(0, a_mask, b_mask | (1 << idx), b[idx]):
                    return False
            return True  # All moves still let Alice win

    # Alice must start with her smallest word, try all minima (smallest unused word possible, due to lex order)
    res = False
    for i in range(n):
        # Smallest word(s) from Alice: could be more if multiple equal
        if i > 0 and a[i] == a[i-1]:
            continue
        if not can_win(1, 1 << i, 0, a[i]):
            res = True
            break
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × 2ᵐ × (n+m)), where n = len(a), m = len(b)
  - Each state is defined by: whose turn (2), a_mask (2ⁿ), b_mask (2ᵐ), and the last word played (at most n+m different).
  - For each state, may try up to n or m candidates depending on turn.
  - Pruned by memoization and small input size.
- **Space Complexity:** O(2ⁿ × 2ᵐ × (n+m))
  - For DP cache plus call stack (which is O(n+m) in depth), but manageable for small n, m (~10).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the lists are not pre-sorted?
  *Hint: Sorting both lists at the start enables optimized traversal for candidate words.*

- Could you give the exact sequence of winning moves for Alice?
  *Hint: Modify the DP to store move paths or parent pointers.*

- How would you optimize if the number of words per player is much higher (say 1000 per list)?
  *Hint: This solution relies on small n due to bitmask DP; scaling would require smarter pruning or a different state representation—maybe greedy search or automaton.*

### Summary
This problem is a **minimax-style turn-based game simulation with memoization**—a common pattern in two-player perfect information games. Here, the key is to model all states using compact information (bitmask for used words, turn indicator, last played word), and use recursion with memoization to check if the starting player (Alice) can guarantee victory. This approach is used in other combinatorial games with state spaces amenable to bitmask DP, such as "can you always win?" questions in Leetcode or classic board/puzzle games.

### Tags
Array(#array), Math(#math), Two Pointers(#two-pointers), String(#string), Greedy(#greedy), Game Theory(#game-theory)

### Similar Problems
