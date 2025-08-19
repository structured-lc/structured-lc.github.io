### Leetcode 1835 (Hard): Find XOR Sum of All Pairs Bitwise AND [Practice](https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and)

### Description  
Given two **arrays** of non-negative integers, **arr1** and **arr2**, you need to compute the XOR sum of the bitwise AND of all pairs (i, j) where element i is from arr1 and element j is from arr2.  
In other words, for every 0 ≤ i < len(arr1) and 0 ≤ j < len(arr2), compute arr1[i] & arr2[j], collect all those results, and finally compute the XOR (⊕) of all those numbers.  
Return a single integer which is this XOR sum.

### Examples  

**Example 1:**  
Input: `arr1 = [1,2,3]`, `arr2 = [6,5]`  
Output: `0`  
*Explanation:  
All pairs and their AND:  
1&6=0, 1&5=1, 2&6=2, 2&5=0, 3&6=2, 3&5=1  
Combined: [0,1,2,0,2,1].  
XOR of all: 0⊕1⊕2⊕0⊕2⊕1=0  
*

**Example 2:**  
Input: `arr1 = `, `arr2 = [4]`  
Output: `4`  
*Explanation: 12 & 4 = 4. Only one pair. XOR sum is 4.*

**Example 3:**  
Input: `arr1 = `, `arr2 = [1,2,3]`  
Output: `0`  
*Explanation: All AND results are 0, so XOR sum is 0.*

### Thought Process (as if you’re the interviewee)  

The brute-force solution is straightforward:  
- For every i in arr1 and j in arr2, compute arr1[i] & arr2[j] and XOR all results.  
- This is O(n × m) time, since all pairwise ANDs are computed.

But for large arrays, that’s not efficient.  
Let’s look for optimizations using **bitwise properties**.  
Recall:
- AND and XOR distribute in some ways.  
- XOR is both associative and commutative.

Key Insight:
- Each output bit is independent.
- For a fixed bit position k, count how many times bit k appears as 1 in the ANDs.
- But due to XOR properties, we can use:  
  The overall XOR sum over all (arr1[i] & arr2[j]) = (XOR of arr1) & (XOR of arr2).

Mathematically:  
If A = arr1 ⊕ arr1[1] ⊕ ...  
   B = arr2 ⊕ arr2[1] ⊕ ...  
Then the final answer is (A & B).  
This is more efficient: loop once through each array for their cumulative XOR, then AND the results.  
Why does this work?  
Because the XOR of all (x & y) over all x in arr1 and y in arr2 == (XOR of arr1) & (XOR of arr2), as shown by expanding sum formulas or via bitwise distributive/commutative properties.

### Corner cases to consider  
- Either array is empty ⇒ output is 0 (no pairs — handle gracefully).
- All zeros (outputs ANDs and XOR must be 0).
- Duplicated values (does not affect since XOR is commutative).
- Single-element arrays.
- Large values (ensure no overflow, but in Python, ints are infinite precision).
- arr1 or arr2 contain both even and odd numbers.

### Solution

```python
def getXORSum(arr1, arr2):
    # Compute XOR of all elements of arr1
    xora = 0
    for num in arr1:
        xora ^= num

    # Compute XOR of all elements of arr2
    xorb = 0
    for num in arr2:
        xorb ^= num

    # The answer is just (xora & xorb)
    return xora & xorb
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(arr1), m = len(arr2).  
  Just two passes, one over each array for the XOR. No nested loops.
- **Space Complexity:** O(1), ignoring input size. We use only constant extra variables for computation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are very large, but both fit in memory?  
  *Hint: Can you optimize further if only one array is massive and the other is small?*

- Can you extend this to use other bitwise operations instead of AND or XOR?  
  *Hint: Try to prove or disprove distributive property for AND/OR with XOR or others.*

- What if you need to find the XOR sum of all pairwise ORs, not ANDs?  
  *Hint: Try to expand out the formula for (arr1[i] | arr2[j]) over all pairs, and search for a similar pattern/separation.*

### Summary
This problem is an elegant application of **bitwise distributivity** and **associativity**, showing how heavy brute-force can sometimes be bypassed using fundamental properties of operations like XOR and AND.  
The pattern of reducing double loops with XOR/AND to a single formula appears in several bitwise “pair sum” or “pairwise function” problems, which are frequent in technical interviews. Re-using this approach with other operations is a good mental exercise for mastering binary tricks.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
