### Leetcode 2829 (Medium): Determine the Minimum Sum of a k-avoiding Array [Practice](https://leetcode.com/problems/determine-the-minimum-sum-of-a-k-avoiding-array)

### Description  
Given integers **n** and **k**, construct an array of **n** distinct positive integers such that no two distinct elements sum to **k** (this is called a **k-avoiding** array).  
Return the **minimum possible sum** of a k-avoiding array of length **n**.

### Examples  

**Example 1:**  
Input: `n = 5, k = 4`  
Output: `18`  
*Explanation: The k-avoiding array [1,2,4,5,6] has sum 18.  
No two elements sum to 4 (e.g., 1+3=4, but 3 is not in the array).  
Other arrays give higher sums or break the k-avoiding rule.*

**Example 2:**  
Input: `n = 2, k = 6`  
Output: `3`  
*Explanation: The array [1,2] is valid; 1+2≠6, and sum is 3 (minimal possible).*

**Example 3:**  
Input: `n = 3, k = 3`  
Output: `7`  
*Explanation: The array [1,2,4] is valid;  
 1+2=3 (excluded), but both included for the minimum sum.  
 But 1+2=3, so can't be together; let's use [1,3,4].  
 1+3=4, 1+4=5, 3+4=7; all ≠3, sum is 1+3+4=8  
 But, since 1+2=3 not allowed, so [1,3,4] or [2,3,4], both sum to 8.  
 8 is minimal possible.*

### Thought Process (as if you’re the interviewee)  
Start by considering the brute-force approach:
- Generate all possible combinations of n distinct positive integers.
- For each, check if any pair sums to k.
- Record the total sum, track the minimal one.

But this is very slow; not feasible for n up to 50.

Optimized idea:
- To minimize sum, try to pick numbers from 1 upwards.
- Each time, make sure that if we select `i`, then `k - i` is not present in our array.
- So, if `k - i` is *not* already chosen, we can take `i`; otherwise, skip and try the next.
- Continue until we've picked `n` numbers.
- This greedy approach always gives the minimal sum because we use small numbers when possible.

Trade-off:
- We might need to skip some numbers, so the array won't necessarily be all the smallest numbers up to n.
- But always choosing the next eligible integer keeps sum minimal.

### Corner cases to consider  
- When `k` is small (e.g., 1 or 2), every pair could sum to k quickly.
- When `n=1`, any single positive integer is valid.
- When `k` is larger than maximum possible sum of n smallest integers.
- When all numbers chosen are less than k/2; no pair can sum to k.
- Repeated elements must not occur (distinctness).
- Large n (approaching 50).

### Solution

```python
def minimumSum(n, k):
    # Holds the numbers included in our k-avoiding array (for sum).
    chosen = set()
    total_sum = 0
    current = 1

    while len(chosen) < n:
        # If (k - current) is not in the array, 'current' is safe to pick.
        if (k - current) not in chosen:
            chosen.add(current)
            total_sum += current
        # Always check the next integer.
        current += 1

    return total_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) — We pick n numbers, and only need to check set membership and maintain a counter. Since n and k ≤ 50, loop runs at most about 2n times in worst-case.

- **Space Complexity:**  
  O(n) — Stores at most n values in the `chosen` set (and negligible integers elsewhere).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array does not need to be distinct?  
  *Hint: Try allowing repetitions and see if minimum sum can be even smaller.*

- How would you construct the actual array, not just its sum?  
  *Hint: Keep a list as you select numbers, in addition to the sum.*

- What is the minimum sum if more than one pair is allowed to sum to k?  
  *Hint: Should track how many such pairs are acceptable and adapt the selection logic.*

### Summary
This is a classic **greedy construction** problem with a uniqueness constraint (no two values sum to k).  
The greedy approach (smallest eligible numbers, skip forbidden ones) ensures the minimum sum.  
Patterns like this commonly appear in problems dealing with *sum constraints, uniqueness, and array construction under pairing rules*.  
The key pattern: **building a set under pairwise restrictions and minimizing a metric (here, the sum)**.  
The array construction and forbidden pair tracking can be generalized to similar problems involving forbidden pairs or sums.


### Flashcard
Greedily pick smallest integers, skipping i if k–i already chosen; sum = 1+2+...+n with gaps where forbidden pairs exist.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
