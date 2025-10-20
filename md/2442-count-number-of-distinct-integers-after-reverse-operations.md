### Leetcode 2442 (Medium): Count Number of Distinct Integers After Reverse Operations [Practice](https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations)

### Description  
You are given an array of positive integers (`nums`). For each original integer in the array, reverse its digits and append this reversed value to the array (the operation is applied only once, not recursively on new elements).  
After all reversals are added, count the total number of distinct integers now present in the array.  
For example, if nums is `[123, 456]`, reverse both to get `[321, 654]` and append, resulting in `[123, 456, 321, 654]`, which contains 4 unique numbers.

### Examples  

**Example 1:**  
Input: `nums = [1,13,10,12,31]`  
Output: `6`  
Explanation: The reversed values are [1, 31, 1, 21, 13]; joined we get [1,13,10,12,31,1,31,1,21,13]. Unique numbers: 1, 10, 12, 13, 21, 31.

**Example 2:**  
Input: `nums = [2,2,2]`  
Output: `1`  
Explanation: All numbers are 2, reverse of 2 is itself. Final array is [2,2,2,2,2,2]. Single unique value: 2.

**Example 3:**  
Input: `nums = [101, 210]`  
Output: `3`  
Explanation: Reverse of 101 is 101, reverse of 210 is 12. Final array is [101, 210, 101, 12]. Unique numbers: 101, 210, 12.

### Thought Process (as if you’re the interviewee)  
- **Brute force idea**: After reversing each number, create an extended array containing the originals and reverses, then compute the unique count.  
  - Convert each integer to string, reverse, convert back, append.  
  - Use a set for uniqueness.

- **Optimization**:  
  - No need to create the entire new array; use a set to collect both original and reversed values for uniqueness as you go.
  - Only process each initial value once for the reverse, no recursive additions on new elements.
  - This is efficient (O(n)) as insertion and lookup in a set are O(1) on average and each number is processed at most twice (original and reverse).

- **Trade-offs**:  
  - Simple, easily implemented solution is also optimal for large input sizes (up to 10⁵ elements).

### Corner cases to consider  
- All elements are identical (e.g. [2,2,2]).
- Numbers with zeros at the end (e.g. 10 → 1).
- Palindromic numbers (reverse is itself, e.g. 121).
- Input includes smallest/largest allowed values.
- Input has only one value.

### Solution

```python
def countDistinctIntegers(nums):
    # Step 1: Use a set to track unique integers
    unique = set()
    
    # Step 2: Add original numbers to the set
    for num in nums:
        unique.add(num)
    
    # Step 3: Reverse each number and add the reversed value to the set
    for num in nums:
        reversed_num = 0
        n = num
        while n > 0:
            reversed_num = reversed_num * 10 + n % 10
            n //= 10
        unique.add(reversed_num)
    
    # Step 4: The size of the set is the answer
    return len(unique)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n is the number of elements and k is the average number of digits per number (since reversing each number is O(k)). The overall is linear with respect to input size.
- **Space Complexity:** O(n), because at most twice the number of unique elements in input can appear (originals and reverses). Uses a set to store them.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle negative numbers if they appeared in the input?  
  *Hint: Think about how reversal works for negative values.*
  
- If you must not use extra space (i.e., no set), can you design an in-place solution?  
  *Hint: Consider sorting and counting unique while traversing.*

- How would you adapt the solution if the reversal operation was recursive (i.e., keep reversing newly added values until no new numbers are added)?  
  *Hint: Use BFS until the set stops growing.*

### Summary
The approach leverages the *Set* pattern to efficiently count unique values after a data augmentation step (digit reversal). It avoids unnecessary storage or processing by combining insertion and reversal in a single scan. The same pattern is common for "count unique values after transformation" problems, which appear in string, number, or event-processing contexts.


### Flashcard
Add both original and reversed integers to hash set while iterating. Return set size for distinct count after all additions.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting)

### Similar Problems
- Reverse Integer(reverse-integer) (Medium)