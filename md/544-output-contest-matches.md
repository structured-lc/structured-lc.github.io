### Leetcode 544 (Medium): Output Contest Matches [Practice](https://leetcode.com/problems/output-contest-matches)

### Description  
You are given `n` teams labeled from 1 to `n` (where `n` is a power of 2). In each round of a single-elimination contest, the strongest team is paired with the weakest, the second strongest with the second weakest, and so on. Each match is represented by a pair in the format `(a,b)`. After each round, winners move on, and the process repeats until only one match remains. The task is to output a string that visually reflects how the matchups unfold, with parentheses encapsulating each round.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `"((1,4),(2,3))"`  
Explanation: First round: (1,4) and (2,3). The final: ((1,4),(2,3)).  

**Example 2:**  
Input: `n = 8`  
Output: `"(((1,8),(4,5)),((2,7),(3,6)))"`  
Explanation:  
- Round 1: (1,8),(2,7),(3,6),(4,5)  
- Round 2: ((1,8),(4,5)),((2,7),(3,6))  
- Final: (((1,8),(4,5)),((2,7),(3,6)))  

**Example 3:**  
Input: `n = 2`  
Output: `"(1,2)"`  
Explanation: Only one match, so output is just (1,2).

### Thought Process (as if you’re the interviewee)  
Initially, I’d try to directly simulate each round.  
- Start by representing each team as a string (`"1"`, `"2"`, …, `"n"`).
- For every round, pair the iᵗʰ with the (n-1-i)ᵗʰ team to reflect strongest with weakest.
- Replace the current list of teams with recursion/iteration over the new pairs.
- Continue until only one string remains.

A brute-force might use explicit recursion, pairing sublists until the base case of a single element. But an iterative reduction (looping and forming new pairings each time) is more straightforward and avoids deep recursive call stacks.

Both approaches work in O(n) time because the list halves in size each round. I’d pick iteration for simplicity.

### Corner cases to consider  
- n = 2 (smallest allowed input, just one match)
- Large n (e.g., n = 2¹²) to check efficiency
- All teams should be unique; no duplicate labels
- n is always a power of two, so list always pairs evenly

### Solution

```python
def findContestMatch(n):
    # Initialize list of team strings from 1 to n
    teams = [str(i+1) for i in range(n)]
    
    # Keep pairing teams until only one match remains
    while len(teams) > 1:
        paired = []
        size = len(teams)
        # Pair first with last, second with second last, etc.
        for i in range(size // 2):
            paired.append(f"({teams[i]},{teams[size-1-i]})")
        teams = paired  # Next round uses new pairs
    # Only one element, which is the full contest string
    return teams[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — In each round, the number of pairings halves, so across all rounds, each original team is part of log₂n pairings, leading to O(n) total work.
- **Space Complexity:** O(n) — Each round produces a new array of half the previous size; together with the string construction, the space usage is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this for cases where n is not a power of two?
  *Hint: Consider how to handle byes or “automatic” qualifications for unpaired teams.*
- Can you output the results in a tree data structure rather than as a string?
  *Hint: Think about constructing a binary tree node structure instead of strings.*
- How would you generate the winners list if we had the outcome of every match?
  *Hint: Pass in an additional result array or tree-walk to select winners per round.*

### Summary
This problem demonstrates an “expanding pairing” pattern, iteratively reducing the list by pairing symmetric elements until a single result remains. The method can be applied to tournament simulations and problems involving repeated halving with pairwise reduction (often seen in tree-building or divide-and-conquer computations). The solution is both space and time efficient, and uses straightforward looping and string construction.


### Flashcard
Iteratively pair strongest with weakest, nesting matches until one winner remains; recursion or iteration works.

### Tags
String(#string), Recursion(#recursion), Simulation(#simulation)

### Similar Problems
