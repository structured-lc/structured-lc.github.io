### Leetcode 2300 (Medium): Successful Pairs of Spells and Potions [Practice](https://leetcode.com/problems/successful-pairs-of-spells-and-potions)

### Description  
Given two integer arrays: **spells** and **potions**, and an integer **success**, find out for each spell how many potions can combine with it to form a "successful" pair.  
A pair is successful if (spell × potion) ≥ success.  
Return an array where each value corresponds to the number of successful pairs for each spell.  
This is essentially: _For each spell, count how many potions satisfy spell × potion ≥ success_.

### Examples  

**Example 1:**  
Input: `spells = [5, 1, 3]`, `potions = [1, 2, 3, 4, 5]`, `success = 7`  
Output: `[4, 0, 3]`  
*Explanation:*
- For spell = 5: products = [5, 10, 15, 20, 25], so the last 4 are ≥ 7 → 4
- For spell = 1: products = [1, 2, 3, 4, 5], none ≥ 7 → 0
- For spell = 3: products = [3, 6, 9, 12, 15], last 3 are ≥ 7 → 3

**Example 2:**  
Input: `spells = [10, 20, 30]`, `potions = [1, 2, 3, 4, 5]`, `success = 100`  
Output: `[0, 1, 3]`  
*Explanation:*
- For spell = 10: [10, 20, 30, 40, 50] → none ≥ 100 → 0  
- For spell = 20: [20, 40, 60, 80, 100] → last is 100 (≥ 100) → 1  
- For spell = 30: [30, 60, 90, 120, 150] → last 3 are 90 < 100, but 120, 150 ≥ 100 → 3  

**Example 3:**  
Input: `spells = [2, 5]`, `potions = [8, 1, 3]`, `success = 16`  
Output: `[2, 3]`  
*Explanation:*
- For spell = 2: [16, 2, 6] → first is 16 (≥ 16), so 1
  (if sorted potions: [1,3,8], products = [2,6,16], only last is successful)
  But example intends the outputs in reading order with sorted potions.
- For spell = 5: [40,5,15] → sorted: [5,15,40], only last is successful

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each spell, iterate over all potions and count how many pairs meet spell × potion ≥ success.  
  Time: O(n × m), where n = len(spells), m = len(potions). This is inefficient for large input.

- **Optimization:**  
  If we sort the potions, for each spell we can binary search for the lowest potion value that satisfies spell × potion ≥ success.  
  For each spell s, find minimal potion p: s × p ≥ success ⇒ p ≥ ⌈success / s⌉

- **Algorithm:**  
  - Sort the potions array.
  - For each spell s, compute `min_potion = ceil(success / s)` (integer division: (success + s - 1) // s).
  - Use binary search to find the first index in potions with value ≥ min_potion.
  - The number of successful pairs for this spell is (len(potions) - found_index).
  - This reduces the time to O(n log m), which is optimal for constraints.

### Corner cases to consider  
- spells or potions array is empty → Output should be all zeros  
- success is 0 → all pairs are successful  
- spells or potions contains zeros  
- success is larger than any possible product → all output zeros  
- Some spells can never reach success, regardless of potion  
- All potions are identical  
- All spells are identical  
- Input arrays of length 1

### Solution

```python
from typing import List

def successfulPairs(spells: List[int], potions: List[int], success: int) -> List[int]:
    # Sort potions to enable binary search
    potions.sort()
    m = len(potions)
    result = []

    for spell in spells:
        # If spell is 0, and success > 0, impossible to reach success
        if spell == 0:
            result.append(0)
            continue

        # Compute minimal potion required (ceiling division)
        min_potion = (success + spell - 1) // spell

        # Binary search for the lowest index with potion >= min_potion
        left, right = 0, m
        while left < right:
            mid = (left + right) // 2
            if potions[mid] < min_potion:
                left = mid + 1
            else:
                right = mid
        # Number of potions that work = m - left
        result.append(m - left)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m + n log m)  
  - Sorting potions: O(m log m)
  - For each spell, binary search over potions: O(log m), repeated n times so O(n log m) total  
- **Space Complexity:** O(1) extra (or O(m) if counting sort space for sorting, but usually O(1) since we sort in-place)

### Potential follow-up questions (as if you’re the interviewer)  

- What if both spells and potions are too large to fit in memory?  
  *Hint: Can you process one at a time, using streams or external sort?*

- What if you need to return the actual list of successful pairs, not just the count?  
  *Hint: Store pair indices or use a modified search to extract pairs.*

- What if the success value changes frequently and you have to answer many queries efficiently?  
  *Hint: Can you preprocess pairs or use segment trees/interval data structures?*

### Summary
This problem is a classic pairing/counting counts ≥ threshold pattern, using **sorting and binary search** to optimize brute-force pair enumeration.  
The solution uses a **two-pointer/binary search pattern** that is common in sorted array queries, as seen in problems involving pair products, triplet sums, and subset counts. This combo is efficient for counting "at least X" relations between sorted arrays and appears often in coding interviews.


### Flashcard
Sort potions, then for each spell, binary search for the smallest potion where spell × potion ≥ success; count all potions from that point onward.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Most Profit Assigning Work(most-profit-assigning-work) (Medium)
- Longest Subsequence With Limited Sum(longest-subsequence-with-limited-sum) (Easy)
- Maximum Matching of Players With Trainers(maximum-matching-of-players-with-trainers) (Medium)