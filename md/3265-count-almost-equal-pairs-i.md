### Leetcode 3265 (Medium): Count Almost Equal Pairs I [Practice](https://leetcode.com/problems/count-almost-equal-pairs-i)

### Description  
You are given an array **nums** of positive integers.  
We say two integers x and y are **almost equal** if using *at most one* swap of any two digits in x **or** y (not both), x and y can become exactly equal (leading zeros are allowed after a swap).  
Return the count of index pairs (i, j) with i < j such that nums[i] and nums[j] are almost equal.

### Examples  

**Example 1:**  
Input: `nums = [3, 12, 30, 17, 21]`  
Output: `2`  
*Explanation:  
- Pair: 3 and 30. Swap 3 and 0 in 30 ⇒ "03" (leading zero allowed), which equals 3.  
- Pair: 12 and 21. Swap 1 and 2 in 12 ⇒ 21.*  

**Example 2:**  
Input: `nums = [1, 1, 1, 1, 1]`  
Output: `10`  
*Explanation:  
Every pair in the array is already equal; no swap needed. There are 5 elements ⇒ 5 choose 2 = 10 pairs.*

**Example 3:**  
Input: `nums = [123, 231]`  
Output: `0`  
*Explanation:  
No swap on 123 or 231 can make them match each other.*

### Thought Process (as if you’re the interviewee)  

Let’s start with brute-force:

- For every pair (i, j) with i < j, check if `nums[i]` and `nums[j]` can be made equal by applying at most one swap in one of them.
- To check if two numbers are almost equal:
  - For both numbers, generate every possible number using at most one swap of any two digits (including the number itself without any swap).
  - If one can reach the other in this way (either by swapping in x or y), then they're an almost equal pair.

Optimizing:
- Since nums.length ≤ 100, O(n²) is acceptable.
- For each number, precompute the set of numbers reachable by swapping at most once. Use a set for lookups.
- For every pair, check if either can reach the other using these sets.

Trade-off:
- This method is acceptable due to the small input constraints. Trying to further optimize to O(n) isn't necessary, as digit permutations limit hashing methods' effectiveness for this problem.

### Corner cases to consider  
- All elements the same (all pairs should be counted).
- Pairs where either number is a single digit (e.g. [5, 51]).
- Numbers with repeated digits (e.g. [11, 11, 11]).
- Numbers with leading zeros after swap (e.g. [10, 01]).
- Numbers with different numbers of digits (e.g. [3, 30]).
- The maximum allowed input values (ensure no int overflow, though Python handles big ints).

### Solution

```python
def count_almost_equal_pairs(nums):
    # Helper: For a number, return a set of all numbers reachable by swapping any two digits (incl. itself)
    def all_one_swaps(num, maxlen):
        s = str(num).zfill(maxlen)
        swaps = set()
        # original number itself (no swap)
        swaps.add(int(s))
        n = len(s)
        s_list = list(s)
        for i in range(n):
            for j in range(i + 1, n):
                l = list(s_list)
                l[i], l[j] = l[j], l[i]
                swaps.add(int(''.join(l)))
        return swaps

    n = len(nums)
    ans = 0
    # pad all numbers with leading zeros to equalize the length for comparison
    maxlen = max(len(str(num)) for num in nums)
    # Precompute swap sets for all numbers
    reachable = [all_one_swaps(num, maxlen) for num in nums]
    
    for i in range(n):
        for j in range(i + 1, n):
            # If nums[i] can reach nums[j] or vice versa
            if nums[j] in reachable[i] or nums[i] in reachable[j]:
                ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n² × d²), where n is the length of nums (≤ 100) and d is the maximal number of digits (≤ 6). For each pair, we potentially check up to d² swapped numbers.
- **Space Complexity:**  
  O(n × S), with S the number of unique swapped numbers per input (≤ 16 for 6-digit numbers), for precomputing reachable numbers per element.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allowed *any* number of swaps per number?  
  *Hint: This is equivalent to checking if the two numbers are permutations of each other.*

- What if both x and y could swap simultaneously?  
  *Hint: You'd need to check all numbers reachable from either, then all reachable from the other, and check for intersection.*

- What if the input array was very large (n up to 10⁵)?  
  *Hint: Precomputation of reachable states and mapping to hash buckets may be needed, and you may need to exploit structure (e.g., digit frequency maps).*

### Summary
This problem uses the **brute-force double loop with precomputation** pattern, leveraging small input size. The central trick: for each number, enumerate all numbers reachable by one swap, and for each pair, check mutual reachability. This "enumerate digit permutations for small constraints" approach is common when the input size is small and operations relate to digits, as seen in digit-based similarity or adjacency counting problems.


### Flashcard
For each pair (i, j), generate all numbers reachable from nums[i] and nums[j] via at most one digit swap; check if they intersect.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
- Check if One String Swap Can Make Strings Equal(check-if-one-string-swap-can-make-strings-equal) (Easy)