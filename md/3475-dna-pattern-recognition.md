### Leetcode 3475 (Medium): DNA Pattern Recognition  [Practice](https://leetcode.com/problems/dna-pattern-recognition)

### Description  
You are given a table representing DNA samples. For each sample, you need to identify whether the DNA sequence satisfies certain biological pattern checks:
- Does the sequence **start with** "ATG"?
- Does the sequence **end with** one of the stop codons: "TAA", "TAG", or "TGA"?
- Does the sequence **contain** the repeated subsequence "ATAT"?
- Does the sequence contain at least **three consecutive 'G'** characters (e.g., "GGG")?
For each sample, you should output four Boolean columns (with values 1 for true and 0 for false), one for each pattern, along with sample_id, dna_sequence, and species. The result should be ordered by sample_id in ascending order.

### Examples  

**Example 1:**  
Input:  
Samples =  
| sample_id | dna_sequence      | species    |
|-----------|------------------|------------|
| 1         | ATGCTAGCTAGCTAA  | Human      |
Output:  
| sample_id | dna_sequence     | species | has_start | has_stop | has_atat | has_ggg |
|-----------|-----------------|---------|-----------|----------|----------|---------|
| 1         | ATGCTAGCTAGCTAA | Human   | 1         | 1        | 0        | 0       |  
*Explanation: Sequence starts with "ATG" (has_start=1), ends with "TAA" (has_stop=1), does not contain "ATAT" (has_atat=0), does not have "GGG" (has_ggg=0).*

**Example 2:**  
Input:  
| sample_id | dna_sequence   | species |
|-----------|---------------|---------|
| 2         | GGGTCAATCATC  | Human   |
Output:  
| sample_id | dna_sequence   | species | has_start | has_stop | has_atat | has_ggg |
|-----------|---------------|---------|-----------|----------|----------|---------|
| 2         | GGGTCAATCATC  | Human   | 0         | 0        | 0        | 1       |  
*Explanation: "GGG" occurs at the start (has_ggg=1), does not start with "ATG", does not end with a stop codon, does not contain "ATAT".*

**Example 3:**  
Input:  
| sample_id | dna_sequence       | species |
|-----------|-------------------|---------|
| 3         | ATATATCGTAGCTA    | Human   |
Output:  
| sample_id | dna_sequence   | species | has_start | has_stop | has_atat | has_ggg |
|-----------|---------------|---------|-----------|----------|----------|---------|
| 3         | ATATATCGTAGCTA| Human   | 0         | 0        | 1        | 0       |  
*Explanation: "ATAT" is a substring (has_atat=1), sequence does not start with "ATG", does not end with valid stop codon, and has no "GGG".*

### Thought Process (as if you’re the interviewee)  
I'd start by reading each DNA sequence row and, for each:
- Check if the sequence starts with "ATG" (use string startswith).
- Check if the sequence ends with one of {"TAA", "TAG", "TGA"} (use string endswith, with a tuple).
- Check if "ATAT" appears anywhere in the sequence (substring 'in').
- Check if "GGG" or longer runs of Gs appear (look for 'GGG' substring).

Brute-force: For every sequence, scan the string to check each pattern. This works in O(L) per row where L is the length of the dna_sequence. Given usual DNA data sizes, it's fast enough.

Possible optimizations: Using regular expressions can compactly match some of these patterns, but since nothing requires complex parsing, simple string functions are most readable and efficient.

Trade-offs: SQL/database solutions would use REGEXP or LIKE, in Python string methods are often best for clarity and speed.

### Corner cases to consider  
- Empty sequence: None of the conditions should match.
- Sequencing exactly equals one of the patterns (e.g., "ATG" or "ATAT").
- Multiple overlapping "ATAT"s in the string.
- "GGGG" (should still count as has_ggg=1).
- Lowercase/uppercase – problem likely assumes uppercase only.
- Both start and end patterns could overlap, e.g., "ATGTAA".
- Lots of 'G's but not three consecutive.

### Solution

```python
def dna_pattern_recognition(samples):
    # Output: list of dicts with the computed pattern fields for each sample
    result = []
    for sample in samples:
        seq = sample['dna_sequence']
        entry = {
            'sample_id': sample['sample_id'],
            'dna_sequence': seq,
            'species': sample['species'],
            'has_start': 1 if seq.startswith("ATG") else 0,
            'has_stop': 1 if seq.endswith("TAA") or seq.endswith("TAG") or seq.endswith("TGA") else 0,
            'has_atat': 1 if "ATAT" in seq else 0,
            'has_ggg': 1 if "GGG" in seq else 0
        }
        result.append(entry)
    return result

# Example usage:
samples = [
    {'sample_id': 1, 'dna_sequence': 'ATGCTAGCTAGCTAA', 'species': 'Human'},
    {'sample_id': 2, 'dna_sequence': 'GGGTCAATCATC', 'species': 'Human'},
    {'sample_id': 3, 'dna_sequence': 'ATATATCGTAGCTA', 'species': 'Human'},
]
print(dna_pattern_recognition(samples))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L)  
  Where n = number of samples, L = average length of dna_sequence. Each pattern check is O(L) worst-case per sample (starts-with, ends-with, substring).
- **Space Complexity:** O(n)  
  Final output needs to store n rows of output. No extra structure except constants for string matching.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the pattern checks, e.g., to allow checking for arbitrary start/stop codons or motifs?  
  *Hint: Could use arrays of patterns and loop through, or parameterize pattern checks.*

- Could you handle much larger DNA datasets (millions of samples)?  
  *Hint: Consider streaming processing, storing only partial output, or distributed computation.*

- How would you find runs of any nucleotide (not just 'G') or the longest run of a nucleotide?  
  *Hint: Use regular expressions or iterate manually, keeping a max-run counter.*

### Summary
This problem uses simple **string pattern recognition** with startswith, endswith, and substring search. It’s an example of direct pattern/exact-match detection—a common interview scenario for bioinformatics pipelines, regular expression problems, and custom SQL queries. Recognizing and checking for sequence motifs is common in both SQL and Python, and can be generalized to more flexible pattern/motif searching problems.

### Tags
Database(#database)

### Similar Problems
