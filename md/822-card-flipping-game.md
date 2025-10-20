### Leetcode 822 (Medium): Card Flipping Game [Practice](https://leetcode.com/problems/card-flipping-game)

### Description  
Given two arrays of integers, `fronts` and `backs`, each representing the numbers on the front and back of \( n \) cards (where fronts[i] and backs[i] refer to the iᵗʰ card), you may flip any number of cards (possibly none). Each flip swaps the numbers on the front and back for that card.

A number is considered **good** if, after flipping, it is on the back of some card and not visible on the front of *any* card. Your goal is to return the *smallest* possible good integer. If no good number exists, return 0.

### Examples  

**Example 1:**  
Input: `fronts = [1,2,4,4,7]`, `backs = [1,3,4,1,3]`  
Output: `2`  
*Explanation: Flip the second card so fronts become [1,3,4,4,7] and backs become [1,2,4,1,3]. Now, 2 is on the back of some card but not on any front. 2 is the smallest such good integer.*

**Example 2:**  
Input: `fronts = [1], backs = [1]`  
Output: `0`  
*Explanation: The same number appears on both sides and cannot be hidden—no good number is possible.*

**Example 3:**  
Input: `fronts = [2,3,1], backs = [3,2,1]`  
Output: `1`  
*Explanation: After possibly flipping cards, 1 appears on the back and is not visible on any front. 1 is the smallest good integer.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force idea might be to try all flip combinations for all cards, but with up to 1000 cards this is infeasible.

Instead, let's clarify the condition: a “good” number must be on the back of some card, and **not** present on any visible front of any card.

Key observations:
- If a number appears on both sides of the same card (fronts[i] == backs[i]), you can never hide it, because no matter how you flip, one side will always show it.
- For numbers that only appear on backs, and never as a front (excluding those that are both sides of the same card), these can be candidates.
- To efficiently find the answer:
  - Build a set of numbers which are on both sides of the same card (let’s call this “impossible” numbers).
  - Build a set of all numbers that are on the fronts.
  - For each number that appears on any back (excluding “impossible” numbers), if it does **not** appear as a front, it is a candidate.
  - Return the minimum of these candidates, or 0 if none exist.

This avoids exhaustive flipping and only checks what is actually feasible to hide and select.

### Corner cases to consider  
- All numbers on both sides are the same: no good number.
- There’s only one card.
- A number appears on both sides of some card, and as front of others—should not be considered good.
- Multiple possible good numbers—the smallest one must be returned.
- Numbers are not unique in fronts/backs.
- Large input sizes for efficiency.

### Solution

```python
def flipgame(fronts, backs):
    n = len(fronts)
    
    # Numbers that appear on both sides of the same card
    impossible = set()
    for i in range(n):
        if fronts[i] == backs[i]:
            impossible.add(fronts[i])
    
    # All candidates: numbers from backs and fronts not in "impossible"
    candidates = set()
    for x in fronts + backs:
        if x not in impossible:
            candidates.add(x)
    
    # We only want numbers that are on some back, and not in impossible.
    # But, after excluding impossible numbers, we need to further exclude numbers visible on fronts.
    result = float('inf')
    for i in range(n):
        if backs[i] not in impossible and backs[i] not in fronts:
            result = min(result, backs[i])
    
    # Also consider the case where a number could be on the front after flipping (since any number not in impossible showing on front is ineligible)
    for i in range(n):
        if fronts[i] not in impossible and fronts[i] not in backs:
            result = min(result, fronts[i])

    return result if result != float('inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  *We process all cards linearly to build sets and check candidates. Each key step is a single pass or two.*
- **Space Complexity:** O(n).  
  *Sets to store impossible numbers and candidates, plus temporary storage.*

### Potential follow-up questions (as if you’re the interviewer)  

- What if cards can have more than two numbers (like three sides each)?  
  *Hint: How would you generalize the representation and flipping logic?*

- What if you want all possible good numbers, not just the smallest?  
  *Hint: Think about modifying the filtering logic to collect all valid candidates.*

- How would you find the minimum number of flips needed to guarantee a good number exists?  
  *Hint: Consider simulating flips or using greedy or dynamic programming strategies.*

### Summary
This problem uses a **set exclusion** pattern and careful construction of “impossible” numbers to efficiently filter feasible answers. The key modeling step is to identify numbers that can never be hidden no matter how you flip cards, and then to check which values can exist on the back but not the front. This approach avoids brute-forcing flips and is a common pattern when problems present with exclusion constraints and combinatorial objects. The set filtering and candidate tracking idea is widely useful in other filtering or pruning interview problems.


### Flashcard
Exclude numbers that appear on both sides of the same card; the answer is the smallest number on the back not present on any front.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
