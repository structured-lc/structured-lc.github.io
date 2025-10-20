### Leetcode 2834 (Medium): Find the Minimum Possible Sum of a Beautiful Array [Practice](https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array)

### Description  
Given two integers **n** and **target**, construct an array of **n distinct positive integers** such that for any two different indices \(i \neq j\), the sum of the iᵗʰ and jᵗʰ elements is **not equal to target**.  
Return the **minimum possible sum** of such an array.

**In other words:**  
Pick n distinct numbers from positive integers such that no two numbers add up exactly to target. The sum of the chosen n numbers should be as small as possible.

---

### Examples  

**Example 1:**  
Input: `n = 2, target = 3`  
Output: `4`  
*Explanation: Pick [1, 3]. 1 + 3 = 4, but 1 + 2 = 3 (not allowed). So pick [1, 2], but 1 + 2 = 3 (not allowed). Next possible is [1, 3] for sum 4. (Or [2, 4], sum 6, but not minimal.)*

**Example 2:**  
Input: `n = 3, target = 3`  
Output: `8`  
*Explanation: Cannot pick both 1 and 2 together, as 1 + 2 = 3. One minimal valid pick: [1, 3, 4] (Sum = 8).*

**Example 3:**  
Input: `n = 1, target = 1`  
Output: `1`  
*Explanation: Only one element, so just pick [1]. Minimal sum = 1.*

---

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible arrays of n distinct positive integers, check for the forbidden sum, and return the minimum sum.  
  This approach is not feasible due to the combinatorial explosion as n grows.

- **Greedy/Pattern:**  
  Since we want the minimal sum, **pick the smallest possible numbers**, but prevent pairs that add up to target.
  - For each picked number `x`, avoid picking `target - x` among the remaining numbers.
  - So: Start picking 1, 2, 3, ..., but whenever picking a number, mark `target - x` as forbidden.

- **Optimal insight:**  
  For numbers below `⌊target/2⌋`, picking up to that number is fine, because their "pair" (target - x) is larger.  
  So, pick all numbers from 1 to **k** where k = min(n, target // 2).

  If n ≤ target//2, pick the first n numbers.

  If not, after using all numbers ≤ target//2, skip all numbers that would pair up with the ones you already picked to add to target (those are target - first set).  
  Continue picking next smallest numbers (exclude forbidden) until you have n numbers total.

  This greedy + exclusion process produces the minimal sum.

---

### Corner cases to consider  
- n = 1 (only one element, so any number is ok)
- very small target (like target = 2)
- n much larger than target (need to skip a lot of forbidden numbers)
- n ≤ target//2 (no forbidden pairs at all)
- target is odd or even (parity might affect forbidden range)

---

### Solution

```python
def minimumPossibleSum(n: int, target: int) -> int:
    used = set()         # Tracks numbers already picked
    forbidden = set()    # Tracks numbers forbidden because they sum to 'target' with a used value
    ans = 0
    num = 1
    picked = 0
    
    while picked < n:
        # Only pick number if not forbidden
        if num not in forbidden:
            ans += num
            # Forbid the *pair* value for subsequent picks
            forbidden.add(target - num)
            picked += 1
        num += 1
    return ans
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) in worst case — We increment `num` and pick at most n numbers, skipping at most n forbidden numbers.

- **Space Complexity:**  
  O(n) for the forbidden set and possible O(n) for used set (though only forbidden is really needed).

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to also return the actual array, not just the sum?  
  *Hint: Track picked numbers in a list during construction.*

- What if negative numbers are allowed?  
  *Hint: The forbidden-pairing logic must carefully handle negatives when checking (target - x).*

- Can you derive a formula for the sum without iteration, possibly using arithmetic series?  
  *Hint: If n ≤ target // 2, the sum is n×(n + 1) // 2. Otherwise, sum the first (target-1)//2 elements, then next needed smallest excluding forbidden values.*

---

### Summary
This problem uses the **greedy constructive approach**—always pick the smallest number not forbidden by current constraints. The exclusion of "mirror" pairs (that sum to target) defines which values are valid to use.  
It's a classic for array construction under pairing constraints and demonstrates greedy plus set-tracking.  
This approach can appear in other settings: **set construction with forbidden patterns**, **greedy assignments with exclusions**, and minimal-sum k-selection problems.


### Flashcard
Pick 1, 2, ..., but skip i if target–i already picked; when blocked, jump to target onwards to minimize sum.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
