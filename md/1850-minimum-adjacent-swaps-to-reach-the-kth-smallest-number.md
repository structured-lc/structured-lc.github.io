### Leetcode 1850 (Medium): Minimum Adjacent Swaps to Reach the Kth Smallest Number [Practice](https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number)

### Description  
Given a string `num` representing a large integer and an integer `k`, return the minimum number of *adjacent* digit swaps needed to transform `num` into its kᵗʰ smallest permutation that is strictly larger than `num`. The kᵗʰ smallest permutation should use the same digits as `num` and be greater in value.  
In other words, compute the kᵗʰ lexicographically next permutation for `num`, then find the fewest adjacent swaps (swap only next-to-each-other digits each time) needed to reach it from the original.

### Examples  

**Example 1:**  
Input: `num = "5489355142", k = 4`  
Output: `2`  
*Explanation: After 4 next-permutations:  
1. "5489355214"  
2. "5489355241"  
3. "5489355412"  
4. "5489355421" (target)  
To convert `"5489355142"` to `"5489355421"`,  
swap '4' and '2' at the end (1), then swap '1' and '2' (2). Total: 2 swaps.*

**Example 2:**  
Input: `num = "11112", k = 4`  
Output: `4`  
*Explanation: After 4 next-permutations:  
1. "11121"  
2. "11211"  
3. "12111"  
4. "21111" (target)  
To convert `"11112"` to `"21111"`, move the '2' from end to start, requiring 4 swaps.*

**Example 3:**  
Input: `num = "00123", k = 1`  
Output: `1`  
*Explanation: Next permutation:  
"00132" (swapping the last two digits). Only 1 swap needed.*

### Thought Process (as if you’re the interviewee)  
I would start by clarifying the definition of "adjacent swap" (swap only digits at adjacent positions) and confirm that permutations must be strictly greater than the current `num`.  

Brute-force approach:  
- Generate all k permutations greater than `num` and find the kᵗʰ one.
- For adjacent swaps, perform BFS or use a sorting algorithm to count minimum moves.

Optimized thinking:  
- Since "next permutation" is a well-known algorithm, call it k times to get the kᵗʰ permutation directly (O(k · n)).
- For the swaps, since orders are the same size and we only swap neighbors, count how to convert the original list to the target using adjacent transpositions:  
  - For each position i from left to right, if the digit in `num` differs from the target, find in `num` the matching digit (at position j > i in `num`), and perform (j - i) swaps to bring it to i, shifting the intervening digits to the right.
  - Repeat for all digits; sum the movements.

This two-pass strategy is clear, easy to code, and efficient for all constraints in the problem.

Trade-Offs:  
- "Next permutation" k times may be slow for overly large k, but k is constrained in Leetcode tests.
- The adjacent swaps logic is optimal and similar to selection sort on the string.

### Corner cases to consider  
- All digits are the same (no swaps needed, or already target).
- k = 1 (only need to compute the next permutation).
- `num` is already the largest permutation (though the problem guarantees a kᵗʰ wonderful number exists).
- Digits with leading zeros.
- num of size 1 (no swap possible).
- num already equals target (zero swaps).

### Solution

```python
def get_next_permutation(arr):
    # Find rightmost i where arr[i] < arr[i+1]
    i = len(arr) - 2
    while i >= 0 and arr[i] >= arr[i + 1]:
        i -= 1
    if i == -1:
        return False  # Already the last permutation
    
    # Find rightmost j > i where arr[j] > arr[i]
    j = len(arr) - 1
    while arr[j] <= arr[i]:
        j -= 1
    # Swap arr[i] and arr[j]
    arr[i], arr[j] = arr[j], arr[i]
    # Reverse arr[i+1:]
    arr[i+1:] = reversed(arr[i+1:])
    return True

def get_kth_permutation(num, k):
    arr = list(num)
    for _ in range(k):
        get_next_permutation(arr)
    return arr

def min_adjacent_swaps(num, target):
    num = list(num)
    target = list(target)
    n = len(num)
    swaps = 0
    for i in range(n):
        if num[i] != target[i]:
            # Find next occurrence of target[i]
            j = i + 1
            while j < n and num[j] != target[i]:
                j += 1
            # Move num[j] left to position i via adjacent swaps
            while j > i:
                num[j], num[j-1] = num[j-1], num[j]
                swaps += 1
                j -= 1
    return swaps

def getMinSwaps(num: str, k: int) -> int:
    # Get the k-th next permutation as the target
    target_arr = get_kth_permutation(num, k)
    target_str = ''.join(target_arr)
    # Count minimum adjacent swaps to reach it
    return min_adjacent_swaps(num, target_str)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(k × n) to compute the kᵗʰ permutation (for next permutation, worst-case O(n) each);  
  O(n²) for adjacent swaps (in the worst-case, for each i, may need O(n) swaps).  
  Overall: O(k × n + n²).

- **Space Complexity:**  
  O(n) extra for character arrays (input/target); all operations are in-place on arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if k could be up to 10⁹?  
  *Hint: Can you find the kᵗʰ permutation more efficiently, without step-by-step generation?*

- How to optimize the number of swaps for massive input, e.g. with repeated digits?  
  *Hint: Think about the minimum number of swaps as the minimum number of inversions.*

- Could you recover the swap sequence itself (not just the count)?  
  *Hint: Trace back the indices to form the swap steps in a list.*

### Summary
This problem is a blend of two classic patterns:  
- Generate the kᵗʰ next permutation using the "next permutation" algorithm, which is a standard method for generating permutations in lex order.  
- Count the minimum number of adjacent swaps via selection-sort-like logic, or by counting inversions, which comes up in sorting questions and string transformation.  
The approach is efficient for small-to-medium k. Both parts of this pattern show up in other questions, such as minimum swaps to convert strings, bubble/selection sort simulation, and kᵗʰ permutation generation.

### Tags
Two Pointers(#two-pointers), String(#string), Greedy(#greedy)

### Similar Problems
- Next Permutation(next-permutation) (Medium)