### Leetcode 1338 (Medium): Reduce Array Size to The Half [Practice](https://leetcode.com/problems/reduce-array-size-to-the-half)

### Description  
Given an array of integers, you can select a set of integers and remove all occurrences of these integers from the array. The task is to find the smallest possible size of such a set, so that at least half of the integers in the array are removed.

### Examples  

**Example 1:**  
Input=``[3,3,3,3,5,5,5,2,2,7]``  
Output=``2``  
Explanation: The array has 10 elements, so you need to remove at least 5 elements. The frequency counts are: 3 (4), 5 (3), 2 (2), 7 (1). To minimize the set size, select the most frequent numbers first—3 and 5. Removing both removes 4 + 3 = 7 elements (more than 5, so you could also choose the set {3,7}, which removes 4 + 1 = 5). The smallest set size is 2. Other sets like {3,2} or {5,2} also work, but no set of size 1 works.

**Example 2:**  
Input=``[7,7,7,7,7,7]``  
Output=``1``  
Explanation: All elements are the same. Removing the set {7} will remove all 6 elements, which is enough to satisfy the condition, and the smallest possible set size is 1.

**Example 3:**  
Input=``[1,9]``  
Output=``1``  
Explanation: There are two distinct numbers. Removing either {1} or {9} removes 1 element, which is exactly half, so the minimum set size is 1.

### Thought Process (as if you’re the interviewee)  

**Brute-force:**  
Generate all possible subsets of the distinct elements, pick the smallest subset whose removal removes at least half the array. This is impractical due to the exponential number of subsets.

**Optimization:**  
The greedy approach is optimal—remove the most frequent elements first. Count the frequency of each number, sort these frequencies in descending order, and keep taking from the top until the cumulative sum crosses ⌊n/2⌋. Count how many frequencies you picked. This ensures the minimal set size.

**Why not dynamic programming?**  
Because the greedy approach always works for this problem—frequency order is the key, and we do not need to search for different combinations once it’s sorted.

### Corner cases to consider  
- All elements the same: requires just one removal.
- All elements unique: you need to remove at least half of the distinct elements.
- Even/odd lengths: The problem says arr.length is even, so ⌊n/2⌋ becomes n/2.
- Elements with the same frequency: Any can be chosen at that step; the answer is still correct.
- Very large array (≈10⁵ elements): Constraint is n ≤ 10⁵, so O(n log n) is acceptable.

### Solution

```python
def minSetSize(arr):
    # Count frequencies using a dictionary
    freq = {}
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
    
    # Collect frequencies and sort in descending order
    frequencies = sorted(freq.values(), reverse=True)
    total, res = 0, 0
    half = len(arr) // 2

    for count in frequencies:
        total += count
        res += 1
        if total >= half:
            break

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Counting frequencies is O(n). Sorting the frequencies is O(k log k) where k is the number of unique elements. In the worst case, k ≈ n, but k ≤ n, so overall O(n log n).
- **Space Complexity:** O(n)  
  We use a dictionary (O(k)) and a list of frequencies (O(k)) where k ≤ n, so O(n).

### Potential follow-up questions  

How would you handle if the array had duplicate subsets of frequencies, i.e., multiple numbers with the same frequency?  
*Hint: Does the order of picking among them affect the answer?*

What if the input array could be modified in-place?  
*Hint: Discuss space optimization—can you avoid extra dictionaries and lists?*

If you could only remove one occurrence of each chosen number (instead of all), how would the solution change?  
*Hint: This would be more complex, as you’d need to track individual removals.*

### Summary

The problem is solved optimally with a greedy approach: count frequencies, sort, and select the most frequent elements until at least half the array is removed. This pattern is common for problems where minimizing a set based on frequency or maximizing coverage (like in Huffman coding or scheduling tasks). The coding pattern—counting, sorting, iterating—is widely applicable in array and set manipulation problems.


### Flashcard
Count frequencies of each element, sort descending, and greedily remove most frequent elements until at least half the array is gone; count how many needed.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
